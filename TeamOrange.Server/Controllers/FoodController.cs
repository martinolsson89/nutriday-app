using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;

namespace TeamOrange.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public FoodController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }


        [HttpGet("api-info")]
        public async Task<IActionResult> GetApiInfo()
        {
            try
            {
                var response = await _httpClient.GetAsync("https://dataportal.livsmedelsverket.se/livsmedel/api/v1/api-info");
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    return Content(content, "application/json");
                }
                else
                {
                    return StatusCode((int)response.StatusCode, response.ReasonPhrase);
                }

            }
            catch (HttpRequestException e)
            {
                return StatusCode(500, $"Internal server error: {e.Message}");
            }
        }

        [HttpGet("food/all-foods")]
        public async Task<IActionResult> GetAllFoods(int offset = 0, int limit = 20, int sprak = 2)
        {
            try
            {
                var response = await _httpClient.GetAsync($"https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel?offset={offset}&limit={limit}&sprak={sprak}");
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    return Content(content, "application/json");
                }
                else
                {
                    return StatusCode((int)response.StatusCode, response.ReasonPhrase);
                }

            }
            catch (HttpRequestException e)
            {
                return StatusCode(500, $"Internal server error: {e.Message}");
            }
        }

        [HttpGet("food/{id}")]
        public async Task<IActionResult> GetFoodById(int id, int sprak = 2)
        {
            try
            {
                var response = await _httpClient.GetAsync($"https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel/{id}?sprak={sprak}");
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    return Content(content, "application/json");
                }
                else
                {
                    return StatusCode((int)response.StatusCode, response.ReasonPhrase);
                }
            }
            catch (HttpRequestException e)
            {
                return StatusCode(500, $"Internal server error: {e.Message}");
            }
        }


        [HttpGet("food/{id}/nutrition")]
        public async Task<IActionResult> GetFoodNutrition(int id, int sprak = 2)
        {
            try
            {
                var response = await _httpClient.GetAsync($"https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel/{id}/naringsvarden?sprak={sprak}");
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    return Content(content, "application/json");
                }
                else
                {
                    return StatusCode((int)response.StatusCode, response.ReasonPhrase);
                }
            }
            catch (HttpRequestException e)
            {
                return StatusCode(500, $"Internal server error: {e.Message}");
            }
        }


    }
}
