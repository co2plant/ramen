// 라멘집, 유저, 리뷰 데이터 (index.html에서 추출)

export const raotaUsers = [
    { id: 'raota', name: '라멘오타쿠' },
    { id: 'expert', name: '라멘전문가' }
];

export const ramenShops = [
    { id: 1, name: "오레노라멘", category: "토리파이탄", address: "서울 마포구 독막로19길 13", geo: { lat: 37.5516, lng: 126.9247 }, image: "https://placehold.co/600x400/FFF4E6/F97316?text=Tori+Paitan", avg_rating: 4.8, menu: [ { name: "토리파이탄 라멘", price: 11000, rating: 4.9 }, { name: "카라파이탄 라멘", price: 11500, rating: 4.7 }, { name: "쇼유 라멘", price: 10000, rating: 4.6 } ], reviews: [ { user: "라멘인플루언서A", menu: "토리파이탄 라멘", rating: 5, comment: "'토리파이탄'은 진하고 부드러운 닭육수의 정석! 꼭 드셔보세요." }, { user: "상위리뷰어B", menu: "카라파이탄 라멘", rating: 4, comment: "면 추가는 필수입니다. 국물이 정말 끝내줘요." } ] },
    { id: 2, name: "하쿠텐", category: "돈코츠", address: "서울 마포구 와우산로29길 14-6", geo: { lat: 37.5582, lng: 126.9116 }, image: "https://placehold.co/600x400/F3E8FF/8B5CF6?text=Donkotsu", avg_rating: 4.7, menu: [ { name: "돈코츠 라멘", price: 9000, rating: 4.8 }, { name: "카라구치 라멘", price: 9500, rating: 4.6 }, { name: "차슈 추가", price: 3000, rating: 4.9 } ], reviews: [ { user: "맛잘알 C", menu: "돈코츠 라멘", rating: 5, comment: "진한 돼지뼈 육수를 좋아한다면 무조건 '돈코츠 라멘'입니다. 차슈 추가는 국룰." }, { user: "홍대주민 D", menu: "카라구치 라멘", rating: 4, comment: "웨이팅이 길지만 그만한 가치가 있는 곳. 매콤한 걸 원하면 카라구치로!" } ] },
    { id: 3, name: "멘텐", category: "쇼유", address: "서울 중구 퇴계로 90", geo: { lat: 37.5698, lng: 126.9772 }, image: "https://placehold.co/600x400/E0F2FE/0EA5E9?text=Shoyu", avg_rating: 4.9, menu: [ { name: "쇼유 라멘", price: 12000, rating: 4.9 }, { name: "시오 라멘", price: 12000, rating: 4.8 }, { name: "탄탄멘", price: 13000, rating: 4.7 } ], reviews: [ { user: "라멘평론가 E", menu: "쇼유 라멘", rating: 5, comment: "간장의 풍미가 살아있는 '쇼유 라멘'은 한 그릇의 예술작품 같아요." }, { user: "광화문직장인 F", menu: "시오 라멘", rating: 5, comment: "점심시간에 누릴 수 있는 최고의 호사. 국물이 정말 맑고 깊어요." } ] },
]; 