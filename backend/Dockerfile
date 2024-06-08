FROM rust:1-bullseye as build

RUN USER=root cargo new --bin backend
WORKDIR /backend

COPY ./Cargo.toml ./Cargo.toml
COPY ./Cargo.lock ./Cargo.lock

RUN cargo build --release
RUN rm src/*.rs

COPY ./src ./src

RUN rm ./target/release/deps/backend*
RUN cargo build --release

FROM debian:bullseye-slim

RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

COPY --from=build /backend/target/release/backend .

ENV FRONTEND_ORIGIN=https://unopack.net

COPY ./templates ./templates

EXPOSE 4000

CMD ["./backend"]
