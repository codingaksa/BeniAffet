import React, { useState, useEffect } from "react";
import "./App.css";
import images from "./img/1000075700.jpg";
const App = () => {
  // 'HAYIR' butonuna kaç kez basıldığını sayar
  const [noClickCount, setNoClickCount] = useState(0);
  // Barışma durumunu yönetir
  const [accepted, setAccepted] = useState(false);
  // Şu anda gösterilen uyarı mesajını tutar
  // Sayfa yüklendiğinde mesaj görünmemesi için başlangıçta boş string olarak ayarlandı.
  const [currentMessage, setCurrentMessage] = useState("");
  // Karıştırılmış uyarı mesajları dizisini tutar
  const [shuffledMessages, setShuffledMessages] = useState([]);
  // Karıştırılmış mesajlar dizisindeki mevcut mesajın indeksini tutar
  const [messageIndex, setMessageIndex] = useState(0);

  // Gösterilecek uyarı mesajları
  const warningMessages = [
    "Emin misin?",
    "Tekrar düşün...",
    "Cidden mi ya.",
    "Kırılım Bak..",
  ];

  // Diziyi Fisher-Yates algoritması kullanarak karıştıran yardımcı fonksiyon
  const shuffleArray = (array) => {
    let newArray = [...array]; // Orijinal diziyi değiştirmemek için sığ bir kopya oluşturur
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Bileşen yüklendiğinde mesajları karıştırır ve ayarlar
  useEffect(() => {
    setShuffledMessages(shuffleArray(warningMessages));
    // setCurrentMessage(warningMessages[0]); // Bu satır kaldırıldı, böylece sayfa açıldığında mesaj görünmez.
  }, []); // Sadece bir kez, bileşen ilk yüklendiğinde çalışır

  // 'HAYIR' butonuna tıklandığında çalışır
  const handleNoClick = () => {
    const newCount = noClickCount + 1;
    setNoClickCount(newCount);

    let nextIndex = messageIndex + 1;
    let newShuffledMessages = [...shuffledMessages];

    // Eğer tüm mesajlar gösterildiyse, diziyi yeniden karıştır ve indeksi sıfırla
    if (nextIndex >= newShuffledMessages.length) {
      newShuffledMessages = shuffleArray(warningMessages);
      nextIndex = 0;
    }

    // Mevcut mesajı ayarla
    setCurrentMessage(newShuffledMessages[nextIndex]);
    // Mesaj indeksini güncelle
    setMessageIndex(nextIndex);
    // Karıştırılmış mesajlar dizisini güncelle (eğer yeniden karıştırıldıysa)
    setShuffledMessages(newShuffledMessages);
  };

  // 'EVET' butonuna tıklandığında çalışır
  const handleYesClick = () => {
    setAccepted(true);
  };

  // YouTube video ID'si Müslüm Gürses - Affet şarkısı için
  const videoId = "jt8G_g2_pBg";

  return (
    <>
      <div className="container">
        {accepted ? (
          // Barışma kabul edildiğinde gösterilecek ekran
          <div className="accepted-screen">
            <h2 className="accepted-title">Seni Çok Seviyorum Sevgilim 💖</h2>
            {/* Otomatik oynatılan ve döngüye alınan bir YouTube videosu yerleştirme */}
            <div className="video-container">
              <iframe
                className="youtube-iframe"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=1`}
                frameBorder="0"
                allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Love Song"
              ></iframe>
            </div>
            <p className="accepted-message">
              Bu küçük video ile sana olan sevgimi ifade etmek istedim.
            </p>
          </div>
        ) : (
          // Barışma sorusu ekranı
          <>
            {/* Profil resmi için yer tutucu (gerçek bir resimle değiştirilmelidir) */}
            <img
              src={images} // Placeholder image for demonstration
              className="profile-img"
            />
            <div className="question-box">
              <p className="question-text">
                Hayatımın Sonuna Denk
                <br />
                Benimle Olmaya Var mısın ? 💖
              </p>
            </div>
            <div className="buttons-container">
              {/* 'EVET' butonu */}
              <button
                className="yes-btn"
                style={{ transform: `scale(${1 + noClickCount * 0.1})` }}
                onClick={handleYesClick}
              >
                EVET
              </button>
              {/* 'HAYIR' butonu */}
              <button className="no-btn" onClick={handleNoClick}>
                HAYIR
              </button>
            </div>
            {/* Uyarı mesajını göstermek için alan */}
            <div className="messages-container">
              {currentMessage && (
                <p className="message-text">{currentMessage}</p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default App;
