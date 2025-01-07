import React, { useEffect, useState } from "react";
import axios from "axios";

const QuranAyahViewer = () => {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [selectedAyahNumber, setSelectedAyahNumber] = useState(null);
  const [arabicAyah, setArabicAyah] = useState(null);
  const [ayahTranslation, setAyahTranslation] = useState(null);
  const [error, setError] = useState(null);

  // Fetch all Surah names
  const fetchSurahs = async () => {
    try {
      const response = await axios.get("http://api.alquran.cloud/v1/surah");
      setSurahs(response.data.data);
    } catch (err) {
      setError("Error fetching Surah list. Please try again.");
    }
  };

  // Fetch Ayah (Arabic) and Translation
  const fetchAyahDetails = async (surahNumber, ayahNumber) => {
    try {
      const arabicResponse = await axios.get(
        `http://api.alquran.cloud/v1/ayah/${surahNumber}:${ayahNumber}/ar.alafasy`
      );
      const translationResponse = await axios.get(
        `https://api.alquran.cloud/v1/ayah/${surahNumber}:${ayahNumber}/ur.junagarhi`
      );
      setArabicAyah(arabicResponse.data.data.text);
      setAyahTranslation(translationResponse.data.data.text);
      setError(null);
    } catch (err) {
      setError("Error fetching Ayah or Translation. Please try again.");
    }
  };

  useEffect(() => {
    fetchSurahs();
  }, []);

  const handleSurahChange = (e) => {
    const surahNumber = e.target.value;
    setSelectedSurah(surahNumber);
    setSelectedAyahNumber(null);
    setArabicAyah(null);
    setAyahTranslation(null);
  };

  const handleAyahChange = (e) => {
    const ayahNumber = e.target.value;
    setSelectedAyahNumber(ayahNumber);
    fetchAyahDetails(selectedSurah, ayahNumber);
  };

  return (
    <div className="ayah-container">
      <h1 className="title">QuranAyahViewer</h1>

      {/* Surah Selector */}
      <div className="input-group">
        <select onChange={handleSurahChange} className="ayah-input">
          <option value="">Chose a Surah</option>
          {surahs.map((surah) => (
            <option key={surah.number} value={surah.number}>
              {surah.englishName} ({surah.numberOfAyahs} آیات)
            </option>
          ))}
        </select>

        {/* Ayah Selector */}
        {selectedSurah && (
          <select onChange={handleAyahChange} className="ayah-input">
            <option value="">Chose ayah</option>
            {Array.from(
              {
                length:
                  surahs.find((s) => s.number === +selectedSurah)
                    ?.numberOfAyahs || 0,
              },
              (_, i) => (
                <option key={i + 1} value={i + 1}>
                  آیت {i + 1}
                </option>
              )
            )}
          </select>
        )}
      </div>

      {error && <p className="error">{error}</p>}

      {/* Display Ayah Details */}
      {arabicAyah && (
        <div className="ayah-card">
          <h2 className="surah-name">
            Surah:{" "}
            {surahs.find((s) => s.number === +selectedSurah)?.englishName}
          </h2>
          <p className="ayah-text">{arabicAyah}</p>
          <p className="ayah-translation">ترجمہ: {ayahTranslation}</p>
        </div>
      )}
    </div>
  );
};

export default QuranAyahViewer;
