# LoG!Chain - Ứng dụng Blockchain Chống Hàng Giả Đối Với Các Thiết Bị Y Tế

LoG!Chain là một dự án ứng dụng blockchain để chống hàng giả trong lĩnh vực thiết bị y tế. Dự án sử dụng công nghệ blockchain để đảm bảo tính minh bạch và bảo mật trong việc theo dõi và xác thực các thiết bị y tế.

## Cấu trúc dự án

Dự án bao gồm 3 thành phần chính:

1. **Backend**:
    - Sử dụng cơ sở dữ liệu PostgreSQL để lưu trữ dữ liệu.
    - API được xây dựng để tương tác với frontend và smart contract.
2. **Frontend**:
    - Ứng dụng web được phát triển bằng React.js.
    - Giao diện người dùng giúp truy cập và quản lý các thiết bị y tế.
3. **Smart Contract**:
    - Sử dụng Solidity để viết các hợp đồng thông minh.
    - Đảm bảo tính toàn vẹn và không thể sửa đổi của dữ liệu thiết bị y tế trên blockchain.

## Yêu cầu hệ thống

- Node.js
- PostgreSQL
- Trình duyệt web hiện đại
- Truffle (cho việc phát triển và triển khai smart contract)

## Hướng dẫn cài đặt

### 1. Cài đặt Backend

1. Cài đặt PostgreSQL và tạo một database mới.
2. Di chuyển vào thư mục `backend`:
    ```bash
    cd backend
    ```
3. Cài đặt các gói phụ thuộc:
    ```bash
    npm install
    ```
4. Cấu hình kết nối PostgreSQL trong file `.env`.
5. Khởi động server backend:
    ```bash
    npm start
    ```

### 2. Cài đặt Frontend

1. Di chuyển vào thư mục `frontend`:
    ```bash
    cd frontend
    ```
2. Cài đặt các gói phụ thuộc:
    ```bash
    npm install
    ```
3. Khởi động ứng dụng frontend:
    ```bash
    npm start
    ```

### 3. Cài đặt Smart Contract

1. Cài đặt Truffle nếu chưa có:
    ```bash
    npm install -g truffle
    ```
2. Di chuyển vào thư mục `smartcontract`:
    ```bash
    cd smartcontract
    ```
3. Biên dịch và triển khai smart contract:
    ```bash
    truffle compile
    truffle migrate
    ```

## Sử dụng

1. Truy cập vào ứng dụng frontend thông qua trình duyệt web.
2. Đăng nhập và thực hiện các chức năng quản lý thiết bị y tế.
3. Kiểm tra và xác thực tính toàn vẹn của thiết bị y tế thông qua các hợp đồng thông minh trên blockchain.

## Đóng góp

Nếu bạn muốn đóng góp cho dự án, vui lòng tạo một pull request hoặc mở một issue mới trên GitHub. Chúng tôi hoan nghênh mọi ý kiến đóng góp từ cộng đồng.

## Giấy phép

Dự án này được cấp phép theo giấy phép MIT. Xem thêm chi tiết trong file [LICENSE](LICENSE).

---

Cảm ơn bạn đã sử dụng LoG!Chain!
