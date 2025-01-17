// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./App.css";

// const translations = [
//   { id: "ur.jalandhry", label: "جالندھری" },
//   // Add more translations here, like:
//   // { id: "ur.mehmoodulhassan", label: "محمود الحسن" },
// ];

// const QuranAyahViewer = () => {
//   const [surahs, setSurahs] = useState([]);
//   const [selectedSurah, setSelectedSurah] = useState(null);
//   const [ayahs, setAyahs] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [ayahsPerPage] = useState(5);
//   const [selectedTranslations, setSelectedTranslations] = useState([
//     "ur.jalandhry",
//     // Add selected translation IDs here
//     // "ur.mehmoodulhassan"
//   ]);

//   const fetchSurahs = async () => {
//     try {
//       const response = await axios.get("http://api.alquran.cloud/v1/surah");
//       setSurahs(response.data.data);
//     } catch (err) {
//       console.error("سورہ کی فہرست حاصل کرنے میں مسئلہ پیش آیا۔", err);
//     }
//   };

//   const fetchAyahs = async (surahNumber) => {
//     try {
//       const translationIds = ["quran-uthmani", ...selectedTranslations].join(
//         ","
//       );

//       const response = await axios.get(
//         `http://api.alquran.cloud/v1/surah/${surahNumber}/editions/${translationIds}`
//       );

//       const arabicAyahs = response.data.data[0].ayahs;
//       const translationsData = response.data.data.slice(1);

//       const combinedAyahs = arabicAyahs.map((ayah, index) => {
//         let translationsMap = {};
//         translationsData.forEach((t) => {
//           translationsMap[t.edition.identifier] = t.ayahs[index]?.text || "";
//         });
//         return {
//           arabic: ayah.text,
//           translations: translationsMap,
//         };
//       });

//       setAyahs(combinedAyahs);
//       setSelectedSurah(surahNumber);
//       setCurrentPage(1);
//     } catch (err) {
//       console.error("آیات حاصل کرنے میں مسئلہ پیش آیا۔", err);
//     }
//   };

//   useEffect(() => {
//     fetchSurahs();
//   }, []);

//   const handleNextPage = () => {
//     setCurrentPage((prev) => prev + 1);
//   };

//   const handlePreviousPage = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   };

//   const indexOfLastAyah = currentPage * ayahsPerPage;
//   const indexOfFirstAyah = indexOfLastAyah - ayahsPerPage;
//   const currentAyahs = ayahs.slice(indexOfFirstAyah, indexOfLastAyah);

//   return (
//     <div className="container">
//       <h1 className="title">The Holy Quran</h1>

//       {!selectedSurah ? (
//         <div className="surah-grid">
//           {surahs.map((surah) => (
//             <div
//               key={surah.number}
//               className="surah-card"
//               onClick={() => fetchAyahs(surah.number)}
//             >
//               <div className="card-header">
//                 <span className="surah-number">{surah.number}</span>
//                 <h3>{surah.englishName}</h3>
//                 <p>{surah.englishNameTranslation}</p>
//                 <p>{surah.numberOfAyahs} آیات</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="surah-detail">
//           <button onClick={() => setSelectedSurah(null)}>واپس جائیں</button>
//           <h2>
//             Surah: {surahs.find((s) => s.number === selectedSurah)?.englishName}
//           </h2>

//           <div className="translation-options">
//             {translations.map((t) => (
//               <label key={t.id} className="custom-checkbox">
//                 <input
//                   type="checkbox"
//                   value={t.id}
//                   checked={selectedTranslations.includes(t.id)}
//                   onChange={() =>
//                     setSelectedTranslations((prev) =>
//                       prev.includes(t.id)
//                         ? prev.filter((item) => item !== t.id)
//                         : [...prev, t.id]
//                     )
//                   }
//                 />
//                 <span className="checkmark"></span>
//                 {t.label}
//               </label>
//             ))}
//           </div>

//           <div className="ayah-list">
//             {currentAyahs.map((ayah, index) => (
//               <div key={index} className="ayah">
//                 <div className="arabic">{ayah.arabic}</div>
//                 {selectedTranslations.map((id) => (
//                   <div key={id} className="urdu">
//                     {ayah.translations[id]}
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>

//           <div className="pagination">
//             <button onClick={handlePreviousPage} disabled={currentPage === 1}>
//               پچھلا صفحہ
//             </button>
//             <button
//               onClick={handleNextPage}
//               disabled={indexOfLastAyah >= ayahs.length}
//             >
//               اگلا صفحہ
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuranAyahViewer;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./App.css";

// const QuranAyahViewer = () => {
//   const [surahs, setSurahs] = useState([]);
//   const [selectedSurah, setSelectedSurah] = useState(null);
//   const [ayahs, setAyahs] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [ayahsPerPage] = useState(5);

//   const fetchSurahs = async () => {
//     try {
//       const response = await axios.get("http://api.alquran.cloud/v1/surah");
//       setSurahs(response.data.data);
//     } catch (err) {
//       console.error("سورہ کی فہرست حاصل کرنے میں مسئلہ پیش آیا۔", err);
//     }
//   };

//   const fetchAyahs = async (surahNumber) => {
//     try {
//       const translationId = "ur.jalandhry";
//       const response = await axios.get(
//         `http://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,${translationId}`
//       );
//       const arabicAyahs = response.data.data[0].ayahs;
//       const urduAyahs = response.data.data[1].ayahs;

//       const combinedAyahs = arabicAyahs.map((ayah, index) => ({
//         arabic: ayah.text,
//         urdu: urduAyahs[index]?.text || "",
//       }));

//       setAyahs(combinedAyahs);
//       setSelectedSurah(surahNumber);
//       setCurrentPage(1);
//     } catch (err) {
//       console.error("آیات حاصل کرنے میں مسئلہ پیش آیا۔", err);
//     }
//   };

//   useEffect(() => {
//     fetchSurahs();
//   }, []);

//   const handleNextPage = () => {
//     setCurrentPage((prev) => prev + 1);
//   };

//   const handlePreviousPage = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   };

//   const indexOfLastAyah = currentPage * ayahsPerPage;
//   const indexOfFirstAyah = indexOfLastAyah - ayahsPerPage;
//   const currentAyahs = ayahs.slice(indexOfFirstAyah, indexOfLastAyah);

//   return (
//     <div className="container">
//       <h1 className="title">The Holy Quran</h1>

//       {!selectedSurah ? (
//         <div className="surah-grid">
//           {surahs.map((surah) => (
//             <div
//               key={surah.number}
//               className="surah-card"
//               onClick={() => fetchAyahs(surah.number)}
//             >
//               <div className="card-header">
//                 <span className="surah-number">{surah.number}</span>
//                 <h3>{surah.englishName}</h3>
//                 <p>{surah.englishNameTranslation}</p>
//                 <p>{surah.numberOfAyahs} آیات</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="surah-detail">
//           <button onClick={() => setSelectedSurah(null)}>واپس جائیں</button>
//           <h2>
//             Surah: {surahs.find((s) => s.number === selectedSurah)?.englishName}
//           </h2>

//           <div className="ayah-list">
//             {currentAyahs.map((ayah, index) => (
//               <div key={index} className="ayah">
//                 <div className="arabic">{ayah.arabic}</div>
//                 <div className="urdu">{ayah.urdu}</div>
//               </div>
//             ))}
//           </div>

//           <div className="pagination">
//             <button onClick={handlePreviousPage} disabled={currentPage === 1}>
//               پچھلا صفحہ
//             </button>
//             <button
//               onClick={handleNextPage}
//               disabled={indexOfLastAyah >= ayahs.length}
//             >
//               اگلا صفحہ
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuranAyahViewer;

import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./App.css";

const QuranAyahViewer = () => {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [ayahs, setAyahs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ayahsPerPage] = useState(3);

  const fetchSurahs = async () => {
    try {
      const response = await axios.get("http://api.alquran.cloud/v1/surah");
      setSurahs(response.data.data);
    } catch (err) {
      console.error("Error fetching surah list", err);
    }
  };

  const fetchAyahs = async (surahNumber) => {
    try {
      const translationId = "ur.jalandhry";
      const response = await axios.get(
        `http://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,${translationId}`
      );
      const arabicAyahs = response.data.data[0].ayahs;
      const urduAyahs = response.data.data[1].ayahs;

      const combinedAyahs = arabicAyahs.map((ayah, index) => ({
        arabic: ayah.text,
        urdu: urduAyahs[index]?.text || "",
      }));

      setAyahs(combinedAyahs);
      setSelectedSurah(surahNumber);
      setCurrentPage(1);
    } catch (err) {
      console.error("Error fetching ayahs", err);
    }
  };

  useEffect(() => {
    fetchSurahs();
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const indexOfLastAyah = currentPage * ayahsPerPage;
  const indexOfFirstAyah = indexOfLastAyah - ayahsPerPage;
  const currentAyahs = ayahs.slice(indexOfFirstAyah, indexOfLastAyah);

  return (
    <div className="container">
      <h1 className="title">The Holy Quran</h1>

      {!selectedSurah ? (
        <div className="surah-grid">
          {surahs.map((surah) => (
            <div
              key={surah.number}
              className="surah-card"
              onClick={() => fetchAyahs(surah.number)}
            >
              <div className="card-header">
                <span className="surah-number">{surah.number}</span>
                <h3>{surah.englishName}</h3>
                <p>{surah.englishNameTranslation}</p>
                <p>{surah.numberOfAyahs} آیات</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="surah-detail">
          <button onClick={() => setSelectedSurah(null)}>واپس جائیں</button>
          <h2>
            Surah: {surahs.find((s) => s.number === selectedSurah)?.englishName}
          </h2>

          <div className="ayah-list">
            {currentAyahs.map((ayah, index) => (
              <div key={index} className="ayah">
                <div className="arabic">{ayah.arabic}</div>
                <div className="urdu">{ayah.urdu}</div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              پچھلا صفحہ
            </button>
            <button
              onClick={handleNextPage}
              disabled={indexOfLastAyah >= ayahs.length}
            >
              اگلا صفحہ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuranAyahViewer;
