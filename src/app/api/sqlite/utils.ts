import sqlite3 from 'sqlite3';
import fs from 'fs';
import { SQLITE_DB_DIR } from '@/service/env';

const createDatabase = (dbName: string, dbDir: string = SQLITE_DB_DIR): void => {
  const dbPath = `${dbDir}/${dbName}.db`;
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, '');
  }
}

class Sqlite {
  private dbName: string;
  private dbPath: string;
  private db: sqlite3.Database;

  constructor(dbName: string = 'finance') {
    this.dbName = dbName;
    this.dbPath = `${SQLITE_DB_DIR}/${dbName}.db`;
    this.db = new sqlite3.Database(this.dbPath, (err) => {
      if (err) {
        console.error('Database opening error: ', err);
      }
    });
  }

  _runQuery(query: string, params: any[] = []) {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run(query, params, function (err) {
          if (err) {
            console.error('Error running query: ', err.message);
            reject(err);
          } else {
            resolve(this);
          }
        });
      });
    });
  }

  runQuery(query: string, params: any[] = []) {
    return this._runQuery(query, params).finally(() => {
      this.db.close();
    });
  }


  delete(tableName: string) {
    return this.runQuery(`DROP TABLE IF EXISTS ${tableName}`);
  }

  _parseFilter(filter: any) {
    if (!filter) return { where: '', params: [] };
    
    if (typeof filter === 'string') {
      // PocketBase 스타일의 필터 문자열 파싱
      const conditions = filter.split('&&').map(condition => condition.trim());
      const parsedConditions = conditions.map(condition => {
        // 연산 매핑
        const operators = {
          '=': '=',
          '!=': '!=',
          '>': '>',
          '>=': '>=',
          '<': '<',
          '<=': '<=',
          '~': 'LIKE',    // 부분 일치
          '!~': 'NOT LIKE' // 부분 불일치
        };

        let [field, op, value] = condition.split(/\s*(=|!=|>=|<=|>|<|~|!~)\s*/);
        
        // 따옴표 제거
        value = value.replace(/^["']|["']$/g, '');
        
        // LIKE 연산자인 경우 와일드카드 추가
        if (op === '~' || op === '!~') {
          value = `%${value}%`;
        }

        return {
          field,
          operator: operators[op as keyof typeof operators] || '=', 
          value
        };
      });

      const where = parsedConditions
        .map(({ field, operator }) => `${field} ${operator} ?`)
        .join(' AND ');
      const params = parsedConditions.map(({ value }) => value);

      return { where, params };
    } else if (typeof filter === 'object') {
      // 객체 형태의 필터
      const entries = Object.entries(filter);
      const where = entries.map(([key]) => `${key} = ?`).join(' AND ');
      const params = entries.map(([_, value]) => value);
      return { where, params };
    }

    return { where: '', params: [] };
  }

  async findOne(tableName: string, filter: any) {
    try {
      const { where, params } = this._parseFilter(filter);
      const query = `SELECT * FROM ${tableName}${where ? ` WHERE ${where}` : ''} LIMIT 1`;
      
      return new Promise((resolve, reject) => {
        this.db.get(query, params, (err, row) => {
          if (err) {
            console.error('Error finding record:', err);
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    } catch (error) {
      console.error('Find operation failed:', error);
      throw error;
    }
  }

  async find(tableName: string, options: any = {}) {
    try {
      const { filter, sort, limit } = options;
      const { where, params } = this._parseFilter(filter);
      
      let query = `SELECT * FROM ${tableName}`;
      if (where) query += ` WHERE ${where}`;
      if (sort) query += ` ORDER BY ${sort}`;
      if (limit) query += ` LIMIT ${limit}`;

      return new Promise((resolve, reject) => {
        this.db.all(query, params, (err, rows) => {
          if (err) {
            console.error('Error finding records:', err);
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    } catch (error) {
      console.error('Find operation failed:', error);
      throw error;
    }
  }

  async insertOne(tableName: string, data: any) {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
    return this.runQuery(query, Object.values(data));
  }

  async insert(tableName: string, dataArray: any[]) {
    const columns = Object.keys(dataArray[0]).join(', ');
    const placeholders = Object.keys(dataArray[0]).map(() => '?').join(', ');
    const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
    return Promise.all(dataArray.map(data => this.runQuery(query, Object.values(data))));
  }

  async upsertOne(tableName: string, data: any, uniqueFields: string | string[]) {
    try {
      // uniqueFields가 문자열이면 배열로 변환
      const fields = typeof uniqueFields === 'string' 
        ? uniqueFields.split(',').map(field => field.trim())
        : uniqueFields;

      if (!fields || fields.length === 0) {
        throw new Error('uniqueFields must be specified');
      }

      // WHERE 절 생성
      const whereClause = fields
        .map(field => `${field} = ?`)
        .join(' AND ');

      // 기존 레코드 검색
      const searchQuery = `SELECT id FROM ${tableName} WHERE ${whereClause}`;
      const searchParams = fields.map(field => data[field]);

      return new Promise((resolve, reject) => {
        this.db.get(searchQuery, searchParams, async (err, row) => {
          if (err) {
            reject(err);
            return;
          }

          try {
            let result;
            if (row) {
              // 레코드가 존재하면 UPDATE
              const setClause = Object.keys(data)
                .filter(key => !fields.includes(key) && key !== 'id')
                .map(key => `${key} = ?`)
                .join(', ');
              const updateParams = [
                ...Object.keys(data)
                  .filter(key => !fields.includes(key) && key !== 'id')
                  .map(key => data[key]),
                ...searchParams
              ];
              const updateQuery = `UPDATE ${tableName} SET ${setClause} WHERE ${whereClause}`;
              result = await this._runQuery(updateQuery, updateParams);
              console.log(`Updated record in ${tableName} with ${whereClause}`);
            } else {
              // 레코드가 없으면 INSERT
              const columns = Object.keys(data).join(', ');
              const placeholders = Object.keys(data).map(() => '?').join(', ');
              const insertQuery = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
              result = await this._runQuery(insertQuery, Object.values(data));
              console.log(`Inserted new record into ${tableName}`);
            }
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      });
    } catch (error) {
      console.error('Upsert failed:', error);
      throw error;
    }
  }

  async upsert(tableName: string, dataArray: any[], uniqueFields: string | string[]) {
    return Promise.all(dataArray.map(data => this.upsertOne(tableName, data, uniqueFields)));
  }
}

export { Sqlite };
