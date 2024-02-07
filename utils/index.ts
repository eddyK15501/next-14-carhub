export const fetchCars = async () => {
  try {
    const headers = {
      'X-RapidAPI-Key': '49dedabdb9mshbd7ad33c5a56ca1p183279jsneb5228f24a81',
      'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
    };

    const response = await fetch(
      'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars',
      {
        headers: headers,
      }
    );

    const result = await response.json();

    return result;
  } catch (err) {
    console.error(err);
  }
};
