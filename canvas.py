from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)

numbers = [{"name": "ъуъ", "value": "3643592396988106323837736129753080402462775058481473214466171292040021490943328721236005252628666211230224007391942467845614444738018339127150284931427508649978196274256520992359386448375161342008671654277573469159334198809637314978351255796416500460118519720174522500375705204183139668951631094984126495598240267548012434582125482470569265669636698391472966175957250323100023274235251431473955731371422003047839415756833761968471662347269005868768053973456482216133258032886941777574915025159357133407955825518112899611008403695332452860952576"},
           {"name": "ъуttъ", "value": "3643592396988106323837736129753080402462775058481473214466171292040021490943328721236005252628666211230224007391942467845614444738018339127150284931427508649978196274256520992359386448375161342008671654277573469159334198809637314978351255796416500460118519720174522500375705204183139668951631094984126495598240267548012434582125482470569265669636698391472966175957250323100023274235251431473955731371422003047839415756833761968471662347269005868768053973456482216133258032886941777574915025159357133407955825518112899611008403695332452860952576"},
           {"name": "ъуtъ", "value": "3643592396988106323837736129753080402462775058481473214466171292040021490943328721236005252628666211230224007391942467845614444738018339127150284931427508649978196274256520992359386448375161342008671654277573469159334198809637314978351255796416500460118519720174522500375705204183139668951631094984126495598240267548012434582125482470569265669636698391472966175957250323100023274235251431473955731371422003047839415756833761968471662347269005868768053973456482216133258032886941777574915025159357133407955825518112899611008403695332452860952576"},
           {"name": "ъуtttъ", "value": "3643592396988106323837736129753080402462775058481473214466171292040021490943328721236005252628666211230224007391942467845614444738018339127150284931427508649978196274256520992359386448375161342008671654277573469159334198809637314978351255796416500460118519720174522500375705204183139668951631094984126495598240267548012434582125482470569265669636698391472966175957250323100023274235251431473955731371422003047839415756833761968471662347269005868768053973456482216133258032886941777574915025159357133407955825518112899611008403695332452860952576"},
           {"name": "ъуttttъ", "value": "3643592396988106323837736129753080402462775058481473214466171292040021490943328721236005252628666211230224007391942467845614444738018339127150284931427508649978196274256520992359386448375161342008671654277573469159334198809637314978351255796416500460118519720174522500375705204183139668951631094984126495598240267548012434582125482470569265669636698391472966175957250323100023274235251431473955731371422003047839415756833761968471662347269005868768053973456482216133258032886941777574915025159357133407955825518112899611008403695332452860952576"},
           {"name": "ъуtttttъ", "value": "3643592396988106323837736129753080402462775058481473214466171292040021490943328721236005252628666211230224007391942467845614444738018339127150284931427508649978196274256520992359386448375161342008671654277573469159334198809637314978351255796416500460118519720174522500375705204183139668951631094984126495598240267548012434582125482470569265669636698391472966175957250323100023274235251431473955731371422003047839415756833761968471662347269005868768053973456482216133258032886941777574915025159357133407955825518112899611008403695332452860952576"}]


@app.route('/numbers', methods=["POST", "GET"])
def get_numbers():
    if request.method == "POST":
        data = request.json
        datakeys = data.keys()
        if type(data) == dict and "name" in datakeys and "value" in datakeys:
            del(numbers[0])
            numbers.append(data)
            return {}, 200
        else:
            return {}, 400
    else:
        return jsonify(numbers)


@app.route('/')
def main():
    return render_template('index.html')
