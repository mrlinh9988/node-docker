docker build -t node-express .

docker run -d --name node-express --env PORT=4000 -p 3000:4000 -v /app/node_modules -v ${PWD}:/app:ro node-express

docker run -d --name node-express --env-file ./.env -p 3000:4000 -v /app/node_modules -v ${PWD}:/app:ro node-express

docker rm -fv <container>   => sẽ xóa container và volume đính kèm với nó , f là force, v là volume

# sử dụng -v /app/node_modules sẽ ko khiến node_modules từ host mount vào bên trong container, nên cho dù có xóa node_modules ở bên ngoài 
# host thì cũng ko ảnh hưởng gì đến node_modules bên trong container vì nó ko còn được mount vào nữa


# Ta có thể cho phép container chỉ read-only mount volume tức là container có thể xem được các file được tạo từ bên ngoài host, bên trong container sẽ ko được tương tác với volume vì nó đang ở mode read-only. Cách dùng như sau:
#   -v ${PWD}:/app:ro   => :ro thể hiện cho read-only


docker compse down -v => sẽ xóa luôn cả volume đính kèm

# Câu lệnh docker compose up -d chỉ tìm ra image được định nghĩa trong file docker-compose chứ nó sẽ ko build lại image mới dù cho có thay đổi
# Dockerfile. Vậy nên muốn build lại ta cần thêm tham số --build

# docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
=> lệnh này sẽ load content của cả 2 file docker-compose.yml và docker-compose.dev.yml 
=> lưu ý là thứ tự docker-compose.yml được load trước, sau đó mới đến docker-compose.dev.yml


# docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d node-app --no-deps
=> có thể chạy lệnh này để chỉ start lại một service cụ thể, ở đây là "node-app", và --nodeps
sẽ ko chạy lại các depend service, ví dụ node-app depend vào mongo thì sẽ chỉ có node-app được 
restart lại

# docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build -V
==> khi ta chạy lại docker-compose up mà container vẫn đang chạy (chưa bị down) và có cấu hình anonymous volume ví dụ node_modules:
    volumes:
      -  /app/node_modules 
nếu ko có option -V thì trong container nó vẫn sử dụng node_modules cũ và ko thể install package mới nếu package.json có package mới
ta phải thêm option -V thì nó mới tạo mới anonymous volume node_modules mới và chứa các package mới



# docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale node-app=2 
==> chú ý là khi chạy scale thì ko được set thuộc tính container_name vì các container cần có unique name


# Để set toàn bộ biến môi trường trên VPS ubuntu ta thêm dòng sau vào cuối file .profile trên VPS:
    set -o allexport; source /home/ubuntu/.env; set -o allexport;

=> nó sẽ loop hết các biến môi trường bên trong file .env và set vào danh sách biến môi trường
trên VPS. Để xem danh sách biến môi trường ta có thể dùng lệnh "printenv"

# Link github: https://github.com/mrlinh9988/node-docker


# docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build node-app
=> chỉ build lại container node-app, trong trường hợp conatiner được restart có depend vào 
container khác thì khi chạy lệnh kia nó cũng check cả container được depend.
Ta có thể thêm params --no-deps để có thể chỉ build lại conatainer cần build mà ko check conatiner được depend:
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build --no-deps node-app
