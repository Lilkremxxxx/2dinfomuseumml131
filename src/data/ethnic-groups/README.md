# Hồ sơ 54 dân tộc

Mỗi file `<slug>.js` là dữ liệu của một trang `/dan-toc/<slug>`. Route dùng chung đọc hồ sơ theo slug, vì vậy khi bổ sung nội dung chỉ cần sửa file của dân tộc đó.

Danh sách tộc danh ban đầu theo [Danh mục các dân tộc Việt Nam của Cục Thống kê](https://www.gso.gov.vn/phuong-phap-luan-thong-ke/danh-muc/cac-dan-toc-viet-nam/). Các hồ sơ `draft` chỉ có tên và khung trống; cần bổ sung nội dung kèm nguồn trước khi xuất bản.

## Cấu trúc hồ sơ

- `status`: `draft` khi đang chờ nội dung, `published` khi hồ sơ đã sẵn sàng.
- `alternateName`, `tagline`, `introduction`: thông tin phần đầu trang.
- `facts`: danh sách `{ label, value }` cho mục thông tin nhanh.
- `sections`: danh sách `{ eyebrow, title, paragraphs }`.
- `media.heroImage`: đường dẫn ảnh mở đầu hoặc chuỗi rỗng.
- `media.gallery`: danh sách `{ src, alt, caption }`.
- `media.videos`: danh sách `{ src, poster, title }`.
- `source`: nguồn tham khảo hiển thị ở cuối trang.

Ảnh và video đặt trong `public/media/ethnic-groups/<slug>/`; đường dẫn sử dụng trên trang bắt đầu bằng `/media/ethnic-groups/<slug>/`.
