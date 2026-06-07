import { calculateDistance, formatDistance } from './distance.js';

export function calculateDistanceScore(distanceKm, maxDistanceKm = 20) {
  if (distanceKm === null || distanceKm === undefined || maxDistanceKm <= 0) {
    return 0;
  }

  const normalized = 1 - Math.min(distanceKm, maxDistanceKm) / maxDistanceKm;
  return Math.max(0, Math.min(1, normalized));
}

export function calculateRecommendationScore({ avgRating, distanceKm = null, maxDistanceKm = 20 }) {
  const ratingScore = Math.max(0, Math.min(1, avgRating / 5));

  if (distanceKm === null || distanceKm === undefined) {
    return ratingScore;
  }

  return ratingScore * 0.7 + calculateDistanceScore(distanceKm, maxDistanceKm) * 0.3;
}

export function enrichShopRecommendation(shop, { userLocation = null, maxDistanceKm = 20 } = {}) {
  const distanceKm = userLocation && shop.geo
    ? calculateDistance(userLocation.lat, userLocation.lng, shop.geo.lat, shop.geo.lng)
    : null;

  const recommendationScore = calculateRecommendationScore({
    avgRating: shop.avg_rating,
    distanceKm,
    maxDistanceKm,
  });

  return {
    ...shop,
    distanceKm,
    formattedDistance: distanceKm === null ? '위치 필요' : formatDistance(distanceKm),
    recommendationScore,
    recommendationLabel: distanceKm === null ? '맛 기준 추천' : '맛 우선 추천',
  };
}

export function pickRecommendedShop(shops) {
  return [...shops].sort((a, b) => b.recommendationScore - a.recommendationScore)[0] || null;
}

export function pickNearestShop(shops) {
  return shops
    .filter(shop => typeof shop.distanceKm === 'number')
    .sort((a, b) => a.distanceKm - b.distanceKm)[0] || null;
}

export function pickTopRatedShop(shops) {
  return [...shops].sort((a, b) => b.avg_rating - a.avg_rating)[0] || null;
}
