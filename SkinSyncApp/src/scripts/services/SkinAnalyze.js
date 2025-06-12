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
          "Gunakan primer untuk menghaluskan tekstur kulit",
          "Pilih foundation dengan hasil akhir natural atau satin",
          "Gunakan cream atau powder blush untuk rona segar",
          "Selalu bersihkan makeup sebelum tidur",
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
          "Gunakan mattifying primer untuk mengontrol minyak",
          "Pilih foundation oil-free dengan hasil akhir matte",
          "Set makeup dengan setting powder, terutama di T-zone",
          "Gunakan powder blush/bronzer untuk menghindari kilap berlebih",
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
          "Gunakan hydrating primer untuk melembapkan kulit",
          "Pilih foundation dengan hasil akhir dewy atau luminous",
          "Gunakan cream blush atau liquid highlighter",
          "Hindari bedak yang terlalu tebal yang dapat menonjolkan kulit kering",
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
          "Gunakan balancing primer",
          "Aplikasikan foundation satin finish, dan set dengan bedak hanya di T-zone",
          "Gunakan moisturizer lebih ringan di T-zone, lebih rich di pipi",
          "Anda bisa menggunakan dua jenis produk (matte di T-zone, hydrating di pipi)",
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
          "Pilih produk kosmetik yang hypoallergenic dan fragrance-free",
          "Gunakan mineral makeup yang cenderung lebih aman",
          "Lakukan patch test sebelum menggunakan produk baru di seluruh wajah",
          "Gunakan primer yang menenangkan dengan kandungan seperti niacinamide",
        ],
      },
    };

    // --- DATABASE PRODUK KOSMETIK ---
    this.productDatabase = {
      normal: [
        {
          name: "Natural Finish Foundation",
          type: "Foundation",
          description:
            "Foundation dengan hasil akhir satin yang menyatu dengan kulit, memberikan tampilan sehat alami.",
          rating: 5,
        },
        {
          name: "Silk Canvas Primer",
          type: "Primer",
          description:
            "Primer yang menghaluskan pori-pori dan membuat makeup tahan lebih lama.",
          rating: 4,
        },
        {
          name: "Rose Glow Blush",
          type: "Blush On",
          description:
            "Perona pipi dengan partikel shimmer halus untuk rona segar.",
          rating: 4,
        },
      ],
      oily: [
        {
          name: "Matte Velvet Foundation",
          type: "Foundation",
          description:
            "Foundation bebas minyak yang mengontrol kilap sepanjang hari dengan hasil akhir matte.",
          rating: 5,
        },
        {
          name: "Oil-Control Setting Powder",
          type: "Bedak",
          description:
            "Bedak tabur transparan untuk mengunci makeup dan menyerap minyak.",
          rating: 4,
        },
        {
          name: "Matte Powder Blush",
          type: "Blush On",
          description:
            "Perona pipi bertekstur bubuk dengan hasil matte untuk menghindari kilap.",
          rating: 4,
        },
      ],
      dry: [
        {
          name: "Hydrating Glow Foundation",
          type: "Foundation",
          description:
            "Foundation menghidrasi yang memberikan efek dewy dan menyamarkan garis halus.",
          rating: 4,
        },
        {
          name: "Luminous Cream Blush",
          type: "Blush On",
          description:
            "Perona pipi berbentuk krim yang memberikan rona sehat dan lembap.",
          rating: 5,
        },
        {
          name: "Hydrating Setting Spray",
          type: "Setting Spray",
          description:
            "Setting spray yang menjaga kelembapan kulit dan membuat makeup menyatu.",
          rating: 4,
        },
      ],
      combination: [
        {
          name: "Balancing Liquid Foundation",
          type: "Foundation",
          description:
            "Foundation cair yang menyeimbangkan area berminyak dan kering untuk hasil yang sempurna.",
          rating: 4,
        },
        {
          name: "T-Zone Perfecting Primer",
          type: "Primer",
          description:
            "Primer yang menargetkan area T-zone untuk mengontrol minyak tanpa membuat kering.",
          rating: 4,
        },
        {
          name: "Satin Finish Blush",
          type: "Blush On",
          description:
            "Perona pipi serbaguna dengan hasil akhir satin yang cocok untuk semua area wajah.",
          rating: 4,
        },
      ],
      sensitive: [
        {
          name: "Mineral Powder Foundation",
          type: "Foundation",
          description:
            "Foundation mineral hypoallergenic, diformulasikan untuk kulit sensitif tanpa bahan iritan.",
          rating: 5,
        },
        {
          name: "Calming Primer with Niacinamide",
          type: "Primer",
          description:
            "Primer yang menenangkan kemerahan dan mempersiapkan kulit sensitif untuk makeup.",
          rating: 4,
        },
        {
          name: "Gentle Mineral Blush",
          type: "Blush On",
          description:
            "Perona pipi dari bahan mineral, bebas dari parfum dan pengawet keras.",
          rating: 4,
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
