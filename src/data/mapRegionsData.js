/**
 * DỮ LIỆU BẢN ĐỒ TƯƠNG TÁC 6 VÙNG SINH THÁI NHÂN VĂN & TÔN GIÁO VIỆT NAM
 * Phục vụ phần Triển lãm bản đồ 2D chuyên đề Dân tộc & Tôn giáo
 */

export const MAP_REGIONS = [
  {
    id: "tay-bac",
    name: "Tây Bắc",
    fullName: "Vùng Núi Cao Tây Bắc & Thượng Nguồn Sông Đà",
    provinces: "Điện Biên, Lai Châu, Sơn La, Hòa Bình, Lào Cai, Yên Bái",
    ethnicGroups: ["Thái", "H'Mông", "Mường", "Dao", "Khơ Mú", "Hà Nhì", "La Ha"],
    dominantReligions: ["Tín ngưỡng bản địa (Then, Mo Mường)", "Tin lành", "Phật giáo"],
    strategicRole: "Phên dậu Tây Bắc của Tổ quốc, địa bàn rừng phòng hộ xung yếu đầu nguồn sông Đà, sông Mã.",
    securityNotice: "Địa bàn các thế lực thù địch từng tìm cách tuyên truyền thành lập cái gọi là 'Nhà nước H'Mông', đòi hỏi củng cố lòng dân, xóa đói giảm nghèo và đề cao cảnh giác.",
    culturalHighlight: "Xòe Thái (Di sản UNESCO), chữ Thái cổ, Mo Mường, lễ hội Gầu Tào của người H'Mông.",
    color: "#E53E3E",
    coordinates: { x: 26, y: 18 }
  },
  {
    id: "dong-bac",
    name: "Đông Bắc",
    fullName: "Vùng Chiến Khu Việt Bắc & Biên Cương Phía Bắc",
    provinces: "Cao Bằng, Lạng Sơn, Bắc Kạn, Hà Giang, Tuyên Quang, Thái Nguyên, Quảng Ninh",
    ethnicGroups: ["Tày", "Nùng", "Sán Chay", "Dao", "Lô Lô", "Kinh", "Pà Thẻn"],
    dominantReligions: ["Tín ngưỡng thờ tổ tiên, Thành hoàng", "Phật giáo", "Công giáo"],
    strategicRole: "Cái nôi cách mạng (Pác Bó, Tân Trào), tuyến biên giới phía Bắc với các cửa khẩu giao thương huyết mạch.",
    securityNotice: "Bảo đảm vững chắc chủ quyền biên giới quốc gia, giữ gìn trật tự an ninh thôn bản biên phòng.",
    culturalHighlight: "Hát Then - đàn Tính của người Tày, Nùng (Di sản UNESCO), Lễ nhảy lửa Pà Thẻn, Chợ tình Khau Vai.",
    color: "#DD6B20",
    coordinates: { x: 38, y: 15 }
  },
  {
    id: "dong-bang-bac-bo",
    name: "Đồng Bằng Bắc Bộ",
    fullName: "Cái Nôi Văn Minh Sông Hồng & Trung Tâm Chính Trị - Văn Hóa",
    provinces: "Hà Nội, Hải Phòng, Bắc Ninh, Nam Định, Ninh Bình, Thái Bình, Hải Dương, Hưng Yên",
    ethnicGroups: ["Kinh (chiếm đa số tuyệt đối)", "Mường", "Hoa"],
    dominantReligions: ["Phật giáo Bắc tông", "Công giáo (Tòa Giám mục Hà Nội, Bùi Chu, Phát Diệm)", "Tín ngưỡng Thờ Mẫu Tam Phủ"],
    strategicRole: "Trung tâm chính trị, văn hóa, khoa học và kinh tế trọng điểm miền Bắc, nơi lưu giữ tinh hoa văn hiến ngàn năm.",
    securityNotice: "Bảo đảm an ninh tôn giáo tại các đô thị lớn, xây dựng mối quan hệ hài hòa lương - giáo.",
    culturalHighlight: "Di sản Tín ngưỡng Thờ Mẫu Tam phủ, Chùa Một Cột, Quần thể Bái Đính - Tràng An, Hội Gióng.",
    color: "#D69E2E",
    coordinates: { x: 42, y: 26 }
  },
  {
    id: "bac-nam-trung-bo",
    name: "Duyên Hải Miền Trung",
    fullName: "Dải Đất Miền Trung — Nơi Hội Tụ Các Nền Văn Hóa Lớn",
    provinces: "Thanh Hóa, Nghệ An, Hà Tĩnh, Quảng Bình, Quảng Trị, Thừa Thiên Huế, Đà Nẵng, Quảng Nam, Bình Thuận, Ninh Thuận",
    ethnicGroups: ["Kinh", "Bru - Vân Kiều", "Pa Cô", "Chăm", "Raglay", "Cơ Tu"],
    dominantReligions: ["Phật giáo", "Công giáo (Trung tâm Hành hương La Vang)", "Hồi giáo Bàni & Chăm Islam", "Bàlamôn giáo"],
    strategicRole: "Cửa ngõ tiến ra Biển Đông, tuyến phòng thủ duyên hải chiến lược, cầu nối giữa hai miền Nam - Bắc.",
    securityNotice: "Chăm lo đời sống đồng bào Chăm và các dân tộc thiểu số vùng Trường Sơn, bảo đảm an ninh biên giới Việt - Lào.",
    culturalHighlight: "Tháp Chàm Po Klong Garai, Lễ hội Katê của người Chăm, Nhã nhạc Cung đình Huế, Văn hóa Thờ Cá Ông của ngư dân.",
    color: "#319795",
    coordinates: { x: 50, y: 46 }
  },
  {
    id: "tay-nguyen",
    name: "Tây Nguyên",
    fullName: "Cao Nguyên Hùng Vĩ — Mái Nhà Đông Dương",
    provinces: "Gia Lai, Kon Tum, Đắk Lắk, Đắk Nông, Lâm Đồng",
    ethnicGroups: ["Gia Rai", "Ba Na", "Ê Đê", "Xơ Đăng", "Cơ Ho", "M'Nông", "Kinh"],
    dominantReligions: ["Tín ngưỡng vạn vật hữu linh (Yàng)", "Tin lành", "Công giáo", "Phật giáo"],
    strategicRole: "Địa bàn chiến lược đặc biệt quan trọng về quốc phòng, an ninh toàn vùng Đông Dương; trung tâm nông sản xuất khẩu (cà phê, cao su).",
    securityNotice: "Điểm nóng từng bị các thế lực phản động FULRO và tàn dư kích động cái gọi là 'Tin lành Đề ga', bạo loạn chính trị 2001, 2004 và vụ khủng bố 11/6/2023 tại Đắk Lắk.",
    culturalHighlight: "Không gian Văn hóa Cồng chiêng Tây Nguyên (Kiệt tác di sản truyền khẩu & phi vật thể nhân loại), Nhà Rông, Nhà Dài Ê Đê, Lễ hội Cà phê.",
    color: "#38A169",
    coordinates: { x: 55, y: 64 }
  },
  {
    id: "nam-bo",
    name: "Nam Bộ & ĐBSCL",
    fullName: "Vùng Đất Phương Nam — Đa Dân Tộc, Đa Tôn Giáo Trù Phú",
    provinces: "TP. Hồ Chí Minh, Cần Thơ, Tây Ninh, An Giang, Sóc Trăng, Trà Vinh, Kiên Giang, Đồng Tháp",
    ethnicGroups: ["Kinh", "Khmer Nam Bộ", "Hoa", "Chăm Nam Bộ"],
    dominantReligions: ["Phật giáo Nam tông Khmer", "Đạo Cao Đài (Tây Ninh)", "Phật giáo Hòa Hảo (An Giang)", "Công giáo", "Hồi giáo Islam"],
    strategicRole: "Vựa lúa lớn nhất nước, trung tâm tài chính - công nghiệp năng động hàng đầu cả nước, biên giới Tây Nam giáp Campuchia.",
    securityNotice: "Cảnh giác trước âm mưu kích động thù hằn của các phần tử cực đoan lợi dụng vấn đề 'Khmer Krom', giữ vững hòa hợp dân tộc - tôn giáo vùng Tây Nam.",
    culturalHighlight: "Tòa Thánh Cao Đài Tây Ninh, Lễ hội Ok Om Bok, Đua ghe Ngo Khmer, Lễ Chôl Chnăm Thmây, Chợ nổi Cái Răng.",
    color: "#3182CE",
    coordinates: { x: 42, y: 84 }
  }
];
