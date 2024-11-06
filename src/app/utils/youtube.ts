export function formatViewCount(viewCount: string): string {
  const count = parseInt(viewCount, 10);

  if (count >= 100000000) {
    return `${Math.floor(count / 100000000)}억`;
  }
  if (count >= 10000) {
    return `${Math.floor(count / 10000)}만`;
  }
  if (count >= 1000) {
    return `${Math.floor(count / 1000)}천`;
  }

  return viewCount;
}

export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years}년 전`;
  if (months > 0) return `${months}개월 전`;
  if (days > 0) return `${days}일 전`;
  if (hours > 0) return `${hours}시간 전`;
  if (minutes > 0) return `${minutes}분 전`;
  return `${seconds}초 전`;
}
