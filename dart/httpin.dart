import 'package:http/http.dart' as http;

Future<String> fetchData() async {
  var url = Uri.https(
    'raw.githubusercontent.com',
    'wowsinfo/WoWs-Info-Seven/refs/heads/API/json/personal_rating.json',
  );
  try {
    var response = await http.get(url);
    if (response.statusCode == 200) {
      return response.body;
    } else {
      throw Exception('Failed to load data: ${response.statusCode}');
    }
  } catch (e) {
    print('Error fetching data: $e');
    return 'Error fetching data: $e';
  }
}

void main() async {
  // Example of a GET request
  final response = await fetchData();
  print('Response data: $response');

  // print(await http.read(Uri.https('example.com', 'foobar.txt')));
}
