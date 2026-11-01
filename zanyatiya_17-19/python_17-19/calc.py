# Занятие 17: консольный калькулятор
print("Консольный калькулятор")
price = float(input("Цена товара: "))
count = int(input("Количество: "))
discount = float(input("Скидка, %: "))

total = price * count
final = total - total * discount / 100

print("Итого:", total)
print("Со скидкой:", round(final, 2))
