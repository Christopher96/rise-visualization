class Model {
  API = "localhost:8000/";

  processResponse(response: any) {
    if (response.code === 500)
      return {
        error: "Something went wrong.",
      };
    if (response.ok) return response.json();

    return response.text().then((error: any) => {
      return {
        error,
      };
    });
  }

  get(path: string) {
    return fetch(this.API + path).then(this.processResponse);
  }

  post(path: string, data = {}) {
    return fetch(this.API + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this.processResponse);
  }
}

export default new Model();
