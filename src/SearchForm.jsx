import { useState } from 'react';

function SearchForm({ onSearch, isLoading }) {
    const [sid, setSid] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault(); 
        if (!sid) {
            alert("Vui lòng nhập mã số sinh viên!");
            return;
        }
        onSearch(sid);
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nhập mã số sinh viên (VD: 20225377)"
                value={sid}
                onChange={(e) => setSid(e.target.value)}
                disabled={isLoading} 
            />
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Đang tìm..." : "Tra cứu"}
            </button>
        </form>
    );
}

export default SearchForm;