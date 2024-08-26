import json


def txt_to_json(txt_file_path, json_file_path):
    word_lengths = {}

    with open(txt_file_path, "r") as txt_file:
        for line in txt_file:
            word = line.strip()
            length = len(word)

            if length not in word_lengths:
                word_lengths[length] = []

            word_lengths[length].append(word)

    with open(json_file_path, "w") as json_file:
        json.dump(word_lengths, json_file, indent=4)


txt_file_path = "./input.txt"
json_file_path = "./output.json"
txt_to_json(txt_file_path, json_file_path)
