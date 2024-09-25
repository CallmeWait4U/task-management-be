<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Swagger document

Sau khi chạy ứng dụng, ta có thể xem document APIs tại: http://localhost:3001/docs

## Mở rộng và tối ưu hóa hiệu suất trong tương lai

- Về mở rộng, nếu mã nguồn quá lớn, có thể ảnh hưởng đến tốc độ chạy của ứng dụng, để giải quyết, mã nguồn có thể chuyển sang Microservice, NestJS có hỗ trợ các thư viện MQTT, RabbitMQ, Kafka,... để phục vụ nhu cầu giao tiếp giữa các services. Ngoài ra, NestJS cũng sử dụng được gRPC để hỗ trợ cân bằng tải, xác thực,...

- Về tối ưu hóa hiệu suất, mã nguồn cần được refactor code để không chứa những đoạn code vô nghĩa. Các câu lệnh truy vấn DB cũng cần được tối ưu.

## An toàn và bảo mật thông tin người dùng

- Không thể đảm bảo 100% nhưng ứng dụng được xây dựng với vài kỹ thuật bảo mật: Xác thực người dùng truy cập API thông qua JWT Token (trừ API Đăng ký, Đăng nhập),  các thông tin quan trọng như mật khẩu, token đều được mã hóa trước khi lưu trữ xuống Database.

## Triển khai ứng dụng

- Viết dockerfile (đã viết trong repo) để đóng gói ứng dụng.

- Viết docker-compose để khởi tạo các container gồm ứng dụng NestJS chạy trên cổng 3001, cơ sở dữ liệu MySQL chạy trên cổng 3306.

- Thuê 1 máy chủ (có thể dùng AWS EC2), cấu hình cho máy chủ.

- Clone source code về máy chủ, chạy file docker-compose.yml với lệnh docker compose up -d và ứng dụng sẽ chạy trên máy chủ ở cổng 3001.