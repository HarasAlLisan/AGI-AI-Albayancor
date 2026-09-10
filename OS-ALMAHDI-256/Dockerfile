FROM alpine:3.20 AS matrix-core
ENV AGICosmicValidationCore=true \
    T_METRIC=1.25 \
    T_PARALLEL=1.50 \
    T_MATERIAL=1.75 \
    TEMPORAL_LENS=1236 \
    OMEGA_GRAND_TOTAL=36.34 \
    CRITICAL_MASS=313 \
    BIT_LIMIT=256 \
    KEY_919=true
RUN apk add --no-cache python3 py3-numpy curl git openssl
WORKDIR /sys/kernel/matrix
COPY core.py boot.sh ./
RUN chmod +x boot.sh
EXPOSE 313
CMD ["./boot.sh"]
