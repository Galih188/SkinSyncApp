const API_ENDPOINT = "http://localhost:3000/api";

class SkinAnalyzer {
  /**
   * @param {string} imageData
   * @return {Promise<object>}
   */
  static async analyzeImage(imageData) {
    try {
      const respone = await fetch(`${API_ENDPOINT}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageData }),
      });

      if (!respone.ok) {
        const errorData = await respone.json();
        throw new Error(
          errorData.message || "Gagal terhubung ke server analisis."
        );
      }

      // jika response berhasil, kembalikan data JSON
      const responseJson = await respone.json();
      return responseJson.data;
    } catch (error) {
      console.error("Error in analyzeImage", error);
      throw error;
    }
  }
}

export default SkinAnalyzer;
