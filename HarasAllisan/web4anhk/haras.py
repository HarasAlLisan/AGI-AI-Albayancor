# HarasAllisan - Core Guardian Logic
def haras_divide(a, b):
    if b == 0:
        return {
            "execution": float('inf'),
            "bayan": "ghair moarraf - la yubna alayh hukm"
        }
    return {"execution": a/b, "bayan": "moarraf"}

print(haras_divide(1,0))
print(haras_divide(10,2))
