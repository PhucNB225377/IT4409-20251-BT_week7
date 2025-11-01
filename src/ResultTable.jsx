function ResultTable({ results }) {
    if (!results || results.length === 0) {
        return <p>Không có dữ liệu kết quả học tập.</p>;
    }

    return (
        <table className="results-table">
            <thead>
                <tr>
                    <th>Mã học phần</th>
                    <th>Tên học phần</th>
                    <th>Số tín chỉ</th>
                    <th>Học kỳ</th>
                    <th>Điểm số</th>
                    <th>Điểm chữ</th>
                </tr>
            </thead>
            <tbody>
                {results.map((row) => (
                    <tr key={row.cid}>
                        <td>{row.cid}</td>
                        <td>{row.cname}</td>
                        <td>{row.credits}</td>
                        <td>{row.term}</td>
                        <td>{row.score}</td>
                        <td>{row.grade}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ResultTable;