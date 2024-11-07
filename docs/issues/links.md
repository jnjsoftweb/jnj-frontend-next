## symbolic links

### windows

> markdown docs용 symblolic link

```sh
# 디렉토리 생성
mkdir C:\JnJ-soft\Projects\internal\jnj-frontend-next\public\links\youtube

# symbolic link 생성
mklink /d "C:\JnJ-soft\Projects\internal\jnj-frontend-next\public\links\youtube\downloads" "C:\JnJ-soft\Projects\internal\jnj-backend\downloads"
```

### macos

```sh
cd /Users/youchan/Dev/Jnj-soft/Projects/external/kmc-web-app/frontend

ln -s "/Users/youchan/Library/CloudStorage/GoogleDrive-mooninone@gmail.com/내 드라이브/Obsidian/00_Playground/00_Inbox/GoogleWorkspace" _markdown

```

### NOTE

#### macOS

> 폴더 이름, 파일 이름에 따라 브라우저에서 불러오지 못하는 경우가 많음

- '-', 대문자, 파일 이름이 긴 경우... 등

### windows

> 파일 이름에 관계없이 잘 불러와짐
