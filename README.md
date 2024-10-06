Đề giữa kỳ WFS
Thực hiện thiết kế cơ sở dữ liệu để đáp ứng những thông tin sau: Check the file WFS_Database_Relationship1
Thông tin cá nhân bao gồm: Họ và tên, ngày tháng năm sinh, nơi sinh, quốc tịch, quá trình học vấn.
Thông tin làm việc bao gồm: các kỹ năng cá nhân, các dự án cá nhân (tên dự án, nội dung, vai trò và thời gian hoàn thành ngày bắt đầu và kết thúc), quá trình làm việc (thời gian bắt đầu kết thúc nếu vẫn đang làm thì để null, tên công ty, vai trò).
Thông tin thêm bao gồm: các sở thích, các mục tiêu cá nhân.
Bảng user: lưu trữ tài khoản mật khẩu người dùng và id hồ sơ sở hữu.
Từ dữ liệu vừa thiết kế hãy thiết kế API có thể đáp ứng các yêu cầu sau:
Từ bảng user tạo API create/login/logout.
Với các trường yêu cầu phải thiết kế API CRUD cho tất cả các thông tin trên cơ sở dữ liệu.
Đối với hồ sơ cá nhân gắn với tài khoản chỉ có chủ sở hữu mới có thể sửa, còn các hồ sơ khác chỉ có thể xem. Nếu không login không thể xem được các hồ sơ.
