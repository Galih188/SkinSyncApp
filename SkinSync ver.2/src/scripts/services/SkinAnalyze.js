class SkinAnalyzer {
  constructor() {
    this.skinTypes = {
      normal: {
        name: "Normal",
        description:
          "Kulit Anda memiliki keseimbangan yang baik antara minyak dan kelembaban. Pori-pori berukuran sedang dan jarang mengalami masalah kulit.",
        conditions: [
          "Tekstur halus",
          "Pori-pori kecil hingga sedang",
          "Jarang berjerawat",
          "Tidak berminyak berlebihan",
        ],
        careTips: [
          "Gunakan cleanser yang lembut 2x sehari",
          "Aplikasikan moisturizer setiap hari",
          "Jangan lupa sunscreen SPF 30+ saat beraktivitas",
          "Lakukan eksfoliasi 1-2x seminggu",
        ],
      },
      oily: {
        name: "Berminyak",
        description:
          "Kulit Anda memproduksi sebum berlebihan, terutama di area T-zone. Pori-pori terlihat besar dan mudah berkomedo.",
        conditions: [
          "Produksi minyak berlebih",
          "Pori-pori besar",
          "Mudah berkomedo",
          "Wajah tampak mengkilap",
        ],
        careTips: [
          "Gunakan cleanser berbahan salicylic acid atau tea tree",
          "Pilih moisturizer oil-free dan non-comedogenic",
          "Gunakan clay mask 1-2x seminggu",
          "Hindari over-cleansing yang dapat memicu produksi minyak berlebih",
        ],
      },
      dry: {
        name: "Kering",
        description:
          "Kulit Anda kekurangan kelembaban dan minyak alami. Terasa kencang dan mudah iritasi, terutama setelah dibersihkan.",
        conditions: [
          "Kulit terasa kencang",
          "Mudah mengelupas",
          "Garis halus lebih terlihat",
          "Jarang berjerawat",
        ],
        careTips: [
          "Gunakan cleanser yang lembut dan creamy",
          "Aplikasikan serum hyaluronic acid sebelum moisturizer",
          "Pilih moisturizer dengan kandungan ceramide atau glycerin",
          "Gunakan face oil di malam hari untuk nutrisi ekstra",
        ],
      },
      combination: {
        name: "Kombinasi",
        description:
          "Kulit Anda memiliki karakteristik berbeda di area wajah. T-zone (dahi, hidung, dagu) berminyak, sementara pipi cenderung normal atau kering.",
        conditions: [
          "T-zone berminyak",
          "Pipi normal/kering",
          "Pori-pori besar di T-zone",
          "Berbagai masalah kulit di area berbeda",
        ],
        careTips: [
          "Gunakan produk berbeda untuk area berbeda",
          "Clay mask hanya di T-zone",
          "Moisturizer lebih ringan di T-zone, lebih rich di pipi",
          "Multi-masking sesuai kebutuhan area wajah",
        ],
      },
      sensitive: {
        name: "Sensitif",
        description:
          "Kulit Anda mudah bereaksi terhadap produk atau faktor lingkungan. Sering mengalami kemerahan, gatal, atau iritasi.",
        conditions: [
          "Mudah kemerahan",
          "Sering iritasi",
          "Terasa gatal atau perih",
          "Reaktif terhadap produk baru",
        ],
        careTips: [
          "Pilih produk fragrance-free dan hypoallergenic",
          "Patch test setiap produk baru",
          "Gunakan ingredients yang menenangkan seperti aloe vera atau chamomile",
          "Hindari scrub fisik, pilih chemical exfoliant yang lembut",
        ],
      },
    };

    this.productDatabase = {
      normal: [
        {
          name: "Gentle Daily Cleanser",
          type: "Pembersih Wajah",
          description:
            "Pembersih lembut untuk penggunaan sehari-hari yang menjaga keseimbangan kulit",
          rating: 4,
        },
        {
          name: "Hydrating Daily Moisturizer",
          type: "Pelembab",
          description:
            "Pelembab ringan yang memberikan hidrasi optimal tanpa rasa berat",
          rating: 5,
        },
        {
          name: "Broad Spectrum SPF 30",
          type: "Sunscreen",
          description:
            "Perlindungan UV yang ringan dan tidak meninggalkan white cast",
          rating: 4,
        },
      ],
      oily: [
        {
          name: "Salicylic Acid Cleanser",
          type: "Pembersih Wajah",
          description:
            "Pembersih dengan BHA untuk mengontrol minyak dan membersihkan pori-pori",
          rating: 5,
        },
        {
          name: "Oil-Free Gel Moisturizer",
          type: "Pelembab",
          description: "Pelembab gel yang ringan dan tidak menyumbat pori-pori",
          rating: 4,
        },
        {
          name: "Clay Purifying Mask",
          type: "Masker",
          description:
            "Masker tanah liat untuk menyerap minyak berlebih dan mengecilkan pori-pori",
          rating: 4,
        },
      ],
      dry: [
        {
          name: "Creamy Hydrating Cleanser",
          type: "Pembersih Wajah",
          description:
            "Pembersih krim yang melembabkan dan tidak membuat kulit kering",
          rating: 4,
        },
        {
          name: "Hyaluronic Acid Serum",
          type: "Serum",
          description: "Serum dengan hyaluronic acid untuk hidrasi intensif",
          rating: 5,
        },
        {
          name: "Rich Night Cream",
          type: "Pelembab Malam",
          description: "Krim malam yang kaya nutrisi untuk regenerasi kulit",
          rating: 5,
        },
      ],
      combination: [
        {
          name: "Balancing Foam Cleanser",
          type: "Pembersih Wajah",
          description:
            "Pembersih yang menyeimbangkan kebutuhan area T-zone dan pipi",
          rating: 4,
        },
        {
          name: "Multi-Zone Moisturizer",
          type: "Pelembab",
          description:
            "Pelembab dengan formula yang dapat disesuaikan untuk berbagai area wajah",
          rating: 4,
        },
        {
          name: "Pore Minimizing Toner",
          type: "Toner",
          description: "Toner untuk mengecilkan pori-pori di T-zone",
          rating: 4,
        },
      ],
      sensitive: [
        {
          name: "Ultra Gentle Cleanser",
          type: "Pembersih Wajah",
          description:
            "Pembersih sangat lembut untuk kulit sensitif, bebas parfum",
          rating: 5,
        },
        {
          name: "Soothing Aloe Moisturizer",
          type: "Pelembab",
          description:
            "Pelembab dengan aloe vera untuk menenangkan kulit sensitif",
          rating: 4,
        },
        {
          name: "Calming Recovery Serum",
          type: "Serum",
          description: "Serum penenang untuk mengurangi kemerahan dan iritasi",
          rating: 5,
        },
      ],
    };
  }

  async analyzeImage(imageData) {
    // Simulate API call delay
    await this.delay(2000);

    // Simulate image analysis (in real implementation, this would call an AI service)
    const analysisResult = this.simulateAnalysis(imageData);

    return analysisResult;
  }

  simulateAnalysis(imageData) {
    // Simple simulation based on random selection
    // In real implementation, this would process the actual image
    const skinTypeKeys = Object.keys(this.skinTypes);
    const randomSkinType =
      skinTypeKeys[Math.floor(Math.random() * skinTypeKeys.length)];
    const skinTypeData = this.skinTypes[randomSkinType];

    // Generate confidence score
    const confidence = Math.floor(Math.random() * 20) + 80; // 80-99%

    // Get product recommendations
    const recommendations =
      this.productDatabase[randomSkinType] || this.productDatabase.normal;

    return {
      skinType: skinTypeData.name,
      confidence: confidence,
      description: skinTypeData.description,
      conditions: skinTypeData.conditions,
      recommendations: recommendations,
      careTips: skinTypeData.careTips,
      timestamp: new Date().toISOString(),
    };
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Method to analyze specific skin concerns
  analyzeSpecificConcerns(imageData, concerns = []) {
    // This could be extended to analyze specific concerns like acne, dark spots, etc.
    const concernAnalysis = {
      acne: Math.random() > 0.5,
      darkSpots: Math.random() > 0.7,
      fineLines: Math.random() > 0.6,
      largesPores: Math.random() > 0.4,
    };

    return concernAnalysis;
  }

  // Method to get skincare routine recommendation
  getSkincareRoutine(skinType) {
    const routines = {
      normal: {
        morning: [
          "Gentle Cleanser",
          "Vitamin C Serum",
          "Moisturizer",
          "Sunscreen",
        ],
        evening: [
          "Gentle Cleanser",
          "Retinol Serum (2-3x/week)",
          "Moisturizer",
        ],
      },
      oily: {
        morning: [
          "Salicylic Acid Cleanser",
          "Niacinamide Serum",
          "Oil-free Moisturizer",
          "Sunscreen",
        ],
        evening: [
          "Salicylic Acid Cleanser",
          "BHA Toner",
          "Lightweight Moisturizer",
        ],
      },
      dry: {
        morning: [
          "Creamy Cleanser",
          "Hyaluronic Acid Serum",
          "Rich Moisturizer",
          "Sunscreen",
        ],
        evening: ["Creamy Cleanser", "Face Oil", "Night Cream"],
      },
      combination: {
        morning: [
          "Balancing Cleanser",
          "Niacinamide (T-zone)",
          "Different Moisturizers per area",
          "Sunscreen",
        ],
        evening: [
          "Balancing Cleanser",
          "BHA (T-zone only)",
          "Targeted Moisturizing",
        ],
      },
      sensitive: {
        morning: [
          "Ultra Gentle Cleanser",
          "Soothing Serum",
          "Fragrance-free Moisturizer",
          "Mineral Sunscreen",
        ],
        evening: [
          "Ultra Gentle Cleanser",
          "Calming Treatment",
          "Rich Night Moisturizer",
        ],
      },
    };

    return routines[skinType.toLowerCase()] || routines.normal;
  }
}

export default SkinAnalyzer;
