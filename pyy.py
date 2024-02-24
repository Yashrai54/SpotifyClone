# Creating a list
my_list = [1, 2, 3, 4, 5]

# Accessing elements
print("Original List:", my_list)
print("First element:", my_list[0])
print("Last element:", my_list[-1])
print("Slicing from index 1 to 3:", my_list[1:4])

# Modifying elements
my_list[2] = 99
print("After modifying element at index 2:", my_list)

# Adding elements
my_list.append(6)
print("After appending 6:", my_list)

my_list.insert(2, 7)
print("After inserting 7 at index 2:", my_list)

extension_list = [8, 9]
my_list.extend(extension_list)
print("After extending with [8, 9]:", my_list)

# Removing elements
my_list.remove(4)
print("After removing 4:", my_list)

popped_element = my_list.pop(2)
print(f"Popped element at index 2: {popped_element}, List now: {my_list}")

# Finding elements
index_of_5 = my_list.index(5)
print("Index of 5:", index_of_5)

# Count occurrences
count_of_2 = my_list.count(2)
print("Count of 2:", count_of_2)

# Sorting
my_list.sort()
print("Sorted list:", my_list)

# Reversing
my_list.reverse()
print("Reversed list:", my_list)

# Copying
copied_list = my_list.copy()
print("Copied list:", copied_list)

# Clearing the list
my_list.clear()
print("Cleared list:", my_list)