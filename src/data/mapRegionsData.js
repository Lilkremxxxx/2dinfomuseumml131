/**
 * DỮ LIỆU BẢN ĐỒ 6 VÙNG SINH THÁI NHÂN VĂN & TÔN GIÁO VIỆT NAM
 * Liên kết trực tiếp với dữ liệu bản đồ SVG 63 tỉnh thành chuẩn địa lý
 */

export const MAP_REGIONS = [
  {
    id: "tay-bac",
    name: "Tây Bắc",
    fullName: "Vùng Núi Cao Tây Bắc & Thượng Nguồn Sông Đà",
    provinces: "Điện Biên, Lai Châu, Sơn La, Hòa Bình, Lào Cai, Yên Bái",
    provinceIds: ["dienbien", "laichau", "sonla", "hoabinh", "laocai", "yenbai"],
    ethnicGroups: ["Thái", "H'Mông", "Mường", "Dao", "Khơ Mú", "Hà Nhì", "La Ha"],
    dominantReligions: ["Tín ngưỡng bản địa (Then, Mo Mường)", "Tin lành", "Phật giáo"],
    strategicRole: "Phên dậu Tây Bắc của Tổ quốc, địa bàn rừng phòng hộ xung yếu đầu nguồn sông Đà, sông Mã.",
    securityNotice: "Địa bàn các thế lực thù địch từng tìm cách tuyên truyền lập cái gọi là 'Nhà nước H'Mông', đòi hỏi củng cố thế trận lòng dân, xóa đói giảm nghèo và đề cao cảnh giác.",
    culturalHighlight: "Nghệ thuật Xòe Thái (Di sản UNESCO), chữ Thái cổ, Mo Mường, lễ hội Gầu Tào của người H'Mông.",
    color: "#EF4444", // Đỏ son
    pin: { x: 100, y: 125 }
  },
  {
    id: "dong-bac",
    name: "Đông Bắc",
    fullName: "Vùng Chiến Khu Việt Bắc & Biên Cương Phía Bắc",
    provinces: "Cao Bằng, Lạng Sơn, Bắc Kạn, Hà Giang, Tuyên Quang, Thái Nguyên, Phú Thọ, Bắc Giang, Quảng Ninh",
    provinceIds: ["hagiang", "caobang", "langson", "backan", "tuyenquang", "thainguyen", "phutho", "bacgiang", "quangninh"],
    ethnicGroups: ["Tày", "Nùng", "Sán Chay", "Dao", "Lô Lô", "Kinh", "Pà Thẻn"],
    dominantReligions: ["Tín ngưỡng thờ tổ tiên, Thành hoàng", "Phật giáo", "Công giáo"],
    strategicRole: "Cái nôi cách mạng (Pác Bó, Tân Trào), tuyến biên giới phía Bắc với các cửa khẩu giao thương quốc tế huyết mạch.",
    securityNotice: "Bảo đảm vững chắc chủ quyền biên giới quốc gia, giữ gìn trật tự an ninh thôn bản biên phòng.",
    culturalHighlight: "Hát Then - đàn Tính của người Tày, Nùng (Di sản UNESCO), Lễ nhảy lửa Pà Thẻn, Chợ tình Khau Vai.",
    color: "#F97316", // Cam đồng
    pin: { x: 230, y: 80 }
  },
  {
    id: "dong-bang-bac-bo",
    name: "Đồng Bằng Bắc Bộ",
    fullName: "Cái Nôi Văn Minh Sông Hồng & Trung Tâm Chính Trị - Văn Hóa",
    provinces: "Hà Nội, Hải Phòng, Bắc Ninh, Nam Định, Ninh Bình, Thái Bình, Hải Dương, Hưng Yên, Hà Nam, Vĩnh Phúc",
    provinceIds: ["hanoi", "haiphong", "haiduong", "hungyen", "bacninh", "hanam", "namdinh", "ninhbinh", "thaibinh", "vinhphuc"],
    ethnicGroups: ["Kinh (chiếm đa số tuyệt đối)", "Mường", "Hoa"],
    dominantReligions: ["Phật giáo Bắc tông", "Công giáo (Tòa Giám mục Hà Nội, Bùi Chu, Phát Diệm)", "Tín ngưỡng Thờ Mẫu Tam Phủ"],
    strategicRole: "Trung tâm chính trị, văn hóa, khoa học và kinh tế trọng điểm miền Bắc, nơi lưu giữ tinh hoa ngàn năm văn hiến.",
    securityNotice: "Bảo đảm an ninh tôn giáo tại các đô thị lớn, xây dựng mối quan hệ hài hòa lương - giáo.",
    culturalHighlight: "Tín ngưỡng Thờ Mẫu Tam phủ (UNESCO), Chùa Một Cột, Quần thể danh thắng Tràng An - Bái Đính, Hội Gióng.",
    color: "#EAB308", // Vàng hoàng gia
    pin: { x: 200, y: 170 }
  },
  {
    id: "bac-nam-trung-bo",
    name: "Duyên Hải Miền Trung",
    fullName: "Dải Đất Miền Trung — Nơi Hội Tụ Các Nền Văn Hóa Lớn & Biển Đảo",
    provinces: "Thanh Hóa, Nghệ An, Hà Tĩnh, Quảng Bình, Quảng Trị, Thừa Thiên Huế, Đà Nẵng, Quảng Nam, Quảng Ngãi, Bình Định, Phú Yên, Khánh Hòa, Ninh Thuận, Bình Thuận (gồm Hoàng Sa & Trường Sa)",
    provinceIds: ["thanhhoa", "nghean", "hatinh", "quangbinh", "quangtri", "tthue", "danang", "quangnam", "quangngai", "binhdinh", "phuyen", "khanhhoa", "ninhthuan", "binhthuan", "hoangsa", "truongsa"],
    ethnicGroups: ["Kinh", "Bru - Vân Kiều", "Pa Cô", "Chăm", "Raglay", "Cơ Tu"],
    dominantReligions: ["Phật giáo", "Công giáo (Trung tâm Hành hương La Vang)", "Hồi giáo Bàni & Chăm Islam", "Bàlamôn giáo"],
    strategicRole: "Cửa ngõ tiến ra Biển Đông, tuyến phòng thủ duyên hải chiến lược, bảo vệ vững chắc chủ quyền biển đảo Tổ quốc.",
    securityNotice: "Chăm lo đời sống đồng bào Chăm và các dân tộc vùng Trường Sơn, bảo đảm an ninh biên giới và an ninh tuyến biển.",
    culturalHighlight: "Tháp Chàm Po Klong Garai, Lễ hội Katê Chăm, Nhã nhạc Cung đình Huế (UNESCO), Lễ hội Cầu ngư Thờ Cá Ông.",
    color: "#06B6D4", // Xanh ngọc biển
    pin: { x: 285, y: 350 }
  },
  {
    id: "tay-nguyen",
    name: "Tây Nguyên",
    fullName: "Cao Nguyên Hùng Vĩ — Mái Nhà Đông Dương",
    provinces: "Gia Lai, Kon Tum, Đắk Lắk, Đắk Nông, Lâm Đồng",
    provinceIds: ["kontum", "gialai", "daklak", "daknong", "lamdong"],
    ethnicGroups: ["Gia Rai", "Ba Na", "Ê Đê", "Xơ Đăng", "Cơ Ho", "M'Nông", "Kinh"],
    dominantReligions: ["Tín ngưỡng vạn vật hữu linh (Yàng)", "Tin lành", "Công giáo", "Phật giáo"],
    strategicRole: "Địa bàn chiến lược đặc biệt quan trọng về quốc phòng, an ninh toàn vùng Đông Dương; trung tâm nông sản xuất khẩu chủ lực.",
    securityNotice: "Điểm nóng từng bị các thế lực thù địch kích động cái gọi là 'Tin lành Đề ga', đòi hỏi xây dựng thế trận lòng dân vững chắc.",
    culturalHighlight: "Không gian Văn hóa Cồng chiêng Tây Nguyên (UNESCO), Sử thi Đăm Săn, Nhà Rông, Nhà Dài Ê Đê, Lễ bỏ mả.",
    color: "#10B981", // Xanh đại ngàn
    pin: { x: 375, y: 550 }
  },
  {
    id: "nam-bo",
    name: "Nam Bộ & ĐBSCL",
    fullName: "Vùng Đất Phương Nam — Đa Dân Tộc, Đa Tôn Giáo Trù Phú",
    provinces: "TP. Hồ Chí Minh, Cần Thơ, Tây Ninh, An Giang, Sóc Trăng, Trà Vinh, Kiên Giang, Đồng Tháp, Bình Dương, Bình Phước, Đồng Nai, Bà Rịa–Vũng Tàu, Long An, Tiền Giang, Bến Tre, Vĩnh Long, Hậu Giang, Bạc Liêu, Cà Mau",
    provinceIds: ["hcm", "baria", "binhduong", "binhphuoc", "dongnai", "tayninh", "longan", "tiengiang", "bentre", "vinhlong", "travinh", "haugiang", "soctrang", "dongthap", "angiang", "kiengiang", "baclieu", "camau", "cantho"],
    ethnicGroups: ["Kinh", "Khmer Nam Bộ", "Hoa", "Chăm Nam Bộ"],
    dominantReligions: ["Phật giáo Nam tông Khmer", "Đạo Cao Đài (Tây Ninh)", "Phật giáo Hòa Hảo (An Giang)", "Công giáo", "Hồi giáo Islam"],
    strategicRole: "Vựa lúa lớn nhất nước, đầu tàu kinh tế năng động hàng đầu cả nước, biên giới Tây Nam giáp Campuchia.",
    securityNotice: "Cảnh giác trước âm mưu kích động thù hằn chia rẽ của các phần tử cực đoan, giữ gìn đoàn kết dân tộc - tôn giáo vùng Tây Nam.",
    culturalHighlight: "Tòa Thánh Cao Đài Tây Ninh, Lễ hội Ok Om Bok, Đua ghe Ngo Khmer, Lễ Chôl Chnăm Thmây, Văn hóa Chợ nổi miền Tây.",
    color: "#3B82F6", // Xanh Cửu Long
    pin: { x: 215, y: 775 }
  }
];
