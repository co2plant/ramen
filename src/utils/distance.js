/**
 * Haversine 공식을 사용하여 두 지점 간의 거리를 계산합니다.
 * @param {number} lat1 - 첫 번째 지점의 위도
 * @param {number} Lng1 - 첫 번째 지점의 경도
 * @param {number} lat2 - 두 번째 지점의 위도
 * @param {number} Lng2 - 두 번째 지점의 경도
 * @returns {number} 두 지점 간의 거리 (km)
 */
export function calculateDistance(lat1, Lng1, lat2, Lng2) {
  const R = 6371; // 지구의 반지름 (km)
  
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(Lng2 - Lng1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 10) / 10; // 소수점 첫째자리까지
}

/**
 * 도(degree)를 라디안(radian)으로 변환합니다.
 * @param {number} deg - 도 단위의 각도
 * @returns {number} 라디안 단위의 각도
 */
function toRad(deg) {
  return deg * (Math.PI / 180);
}

/**
 * 거리를 사람이 읽기 쉬운 형태로 포맷합니다.
 * @param {number} distance - 거리 (km)
 * @returns {string} 포맷된 거리 문자열
 */
export function formatDistance(distance) {
  if (distance === null || distance === undefined) {
    return '거리 정보 없음';
  }
  
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  
  return `${distance.toFixed(1)}km`;
}
