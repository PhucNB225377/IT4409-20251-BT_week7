import { useState, useEffect } from 'react';
import './App.css';
import SearchForm from './SearchForm.jsx'
import ResultTable from './ResultTable.jsx'
import LoadingIndicator from './LoadingIndicator.jsx'

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Không thể tải ${url}`);
  }
  return response.json();
};

function diemChu(score) {
  if (score >= 9.5) return "A+";
  if (score >= 8.5) return "A";
  if (score >= 8.0) return "B+";
  if (score >= 7.0) return "B";
  if (score >= 6.5) return "C+";
  if (score >= 5.5) return "C";
  if (score >= 5.0) return "D+";
  if (score >= 4.0) return "D";
  return "F";
}

function App() {
  const [sid, setSid] = useState(null);
  const [sname, setSname] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (sid) => {
    setSid(sid);
  };

  useEffect(() => {
    if (!sid) {
      return;
    }

    const fetchAllData = async () => {
      setIsLoading(true);
      setError(null);
      setResults([]);
      setSname("");

      try {
        const [svData, hpData, kqData] = await Promise.all([
          fetchData('/sinhvien.json'),
          fetchData('/hocphan.json'),
          fetchData('/ketqua.json'),
          new Promise(resolve => setTimeout(resolve, 2000))
        ]);
        
        const sv = svData.find(s => s.sid === sid);
        if (!sv) {
          throw new Error("Không tìm thấy sinh viên!");
        }

        const listKQ = kqData.filter(k => k.sid === sid);

        const fullResults = listKQ.map((kq) => {
            const hp = hpData.find(h => h.cid === kq.cid);
            return {
              cid: hp.cid,
              cname: hp.name,
              credits: hp.credits,
              term: kq.term,
              score: kq.score,
              grade: diemChu(kq.score)
            };
        });
        
        setResults(fullResults);
        setSname(sv.name);

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();

  }, [sid]); 

  return (
    <>
      <h2>Trang tra cứu kết quả học tập</h2>
      
      <SearchForm onSearch={handleSearch} isLoading={isLoading} />

      {isLoading && <LoadingIndicator />}
      {error && <p className="status-error">{error}</p>}

      {!isLoading && !error && sname && (
        <div className="results">
          <h3>Kết quả học tập của {sname} ({sid})</h3>
          <ResultTable results={results} />
        </div>
      )}
      
      {!isLoading && !error && sname && results.length === 0 && (
         <p>Sinh viên này chưa có kết quả học tập.</p>
      )}
    </>
  );
}

export default App;