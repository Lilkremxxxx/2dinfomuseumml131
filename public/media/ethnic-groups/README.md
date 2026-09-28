# Media theo dân tộc

Đặt media của từng hồ sơ trong thư mục theo slug, ví dụ:

- `public/media/ethnic-groups/kinh/`
- `public/media/ethnic-groups/ta-oi/`

Trong file hồ sơ `src/data/ethnic-groups/<slug>.js`, tham chiếu file bằng URL `/media/ethnic-groups/<slug>/<ten-file>`. Ảnh dùng `media.heroImage` hoặc `media.gallery`; video dùng `media.videos`.
