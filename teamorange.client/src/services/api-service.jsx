class ApiService {

    async #_myFetch(apiUrl, method = null, body = null) {
        try {
            method ??= 'GET';
            let res = await fetch(apiUrl, {
                method: method,
                headers: { 'content-type': 'application/json' },
                body: body ? JSON.stringify(body) : null
            });

            if (res.ok) {

                console.log(`\n${method} Request successful @ ${apiUrl}`);

                //get the data from server
                let data = await res.json();
                return data;
            }
            else {

                //typcially you would log an error instead
                console.log(`Failed to recieved data from server: ${res.status}`);
                alert(`Failed to recieved data from server: ${res.status}`);
            }
        }
        catch (err) {

            //typcially you would log an error instead
            console.log(`Failed to recieved data from server: ${err.message}`);
            alert(`Failed to recieved data from server: ${err.message}`);
        }
    }
  // https://localhost:7140
  // nutriday-gffaahbbarcvf6fj.westeurope-01.azurewebsites.net
    #_buildUrl(endpoint, params = {}) {
      const url = new URL(endpoint, 'https://nutriday-gffaahbbarcvf6fj.westeurope-01.azurewebsites.net'); // Base URL is set here
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        return url.toString();
    }

    // API information such as name, version, release date, documentation and status.
    // GET: /api/v{version}/api-info

    async #_testApiAsync() {
        const apiUrl = this.#_buildUrl('/api/api-info');
        return await this.#_myFetch(apiUrl);
    }

    // Retrieves a list of food items. To control the selection parameters "offstet" and "limit" are used.
    // GET: /api/v{version}/livsmedel

    async #_getItemsAsync(offset = 0, limit = 20, sprak = 2) {
        const apiUrl = this.#_buildUrl('/api/food/all-foods', { offset, limit, sprak});
        const data = await this.#_myFetch(apiUrl);

        if (data) {
            return {
                meta: data._meta,
                links: data._links,
                items: data.livsmedel
            };
        }
        return null;
    }

    // Retrieves a food item by its food id.
    // GET: /api/v{version}/livsmedel/{nummer}

    async #_getItemByIdAsync(id) {
        const apiUrl = this.#_buildUrl(`/api/Food/food/${id}`, { sprak: 1 });
        return await this.#_myFetch(apiUrl);
    }

    // Retrieves all nutritional values for a specific food item.
    // GET: /api/v{version}/livsmedel/{nummer}/naringsvarden

    async #_getItemNutritionAsync(id) {
        const apiUrl = this.#_buildUrl(`api/Food/food/${id}/nutrition`, { sprak: 2 });
        return await this.#_myFetch(apiUrl);
    }



    // Public methods
    testApi = async () => this.#_testApiAsync();
    getItems = async (offset, limit, sprak) => this.#_getItemsAsync(offset, limit, sprak);
    getItemById = async (id) => this.#_getItemByIdAsync(id);
    getItemNutrition = async (id) => this.#_getItemNutritionAsync(id);



}

export default ApiService;
