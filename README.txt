Các component được sử dụng để quản lý state là 'App.jsx' và 'SearchForm.jsx'.
'App.jsx' là component chính để quản lý toàn bộ dữ liệu, sử dụng ueState để lưu trữ sid, sname, results, isLoading(lưu trạng thái đang tải dữ liệu hay không), error.
Component App sẽ truyền các state này xuống các component con dưới dạng props.
'SearchForm.jsx' là component con cũng dùng ueState để quản lý state nội bộ là sid, sử dụng để gửi sid lên App được nhập từ input.
useEffect chỉ được sử dụng trong App component và được kích hoạt phụ thuộc vào [sid].
Có 2 thời điểm mà useEffect được kích hoạt đó là lần đầu component App được render(lúc này khởi tạo sid là null nên chạy if(!sid) và return ngay lập tức) và mỗi khi state sid bị thay đổi.
