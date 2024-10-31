const srtToVtt = (srtContent: string): string => {
    // 줄 단위로 분리
    const lines = srtContent.split('\n');
    
    // 숫자만 있는 줄 제거
    const filteredLines = lines.filter(line => {
        const trimmed = line.trim();
        return !(trimmed !== '' && !isNaN(Number(trimmed)));
    });
    
    // 콤마를 점으로 변경
    const content = filteredLines.join('\n').replace(/,/g, '.');
    
    // WEBVTT 헤더 추가
    return `WEBVTT\n\n${content}`;
};

// 파일 시스템 작업을 위한 함수 (Node.js 환경에서 사용)
const convertSrtFileToVtt = async (srtPath: string, vttPath: string): Promise<void> => {
    try {
        const fs = require('fs').promises;
        
        // SRT 파일 읽기
        const srtContent = await fs.readFile(srtPath, 'utf-8');
        
        // VTT로 변환
        const vttContent = srtToVtt(srtContent);
        
        // VTT 파일 저장
        await fs.writeFile(vttPath, vttContent, 'utf-8');
        
        console.log('변환이 완료되었습니다.');
    } catch (error) {
        console.error('변환 중 오류가 발생했습니다:', error);
        throw error;
    }
};

// 브라우저에서 파일 변환하기
const handleFileConversion = async (srtFile: File): Promise<string> => {
    const text = await srtFile.text();
    return srtToVtt(text);
};


export { convertSrtFileToVtt, handleFileConversion };

// 사용 예시:
// const fileInput = document.querySelector('input[type="file"]');
// fileInput.addEventListener('change', async (e) => {
//     const file = e.target.files[0];
//     const vttContent = await handleFileConversion(file);
//     // vttContent 사용
// });