import { useRouter } from "next/router";

export const MultiSearch = () => {
  const router = useRouter(); // Menggunakan router dari Next.js

  const handleSearch = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const day = formData.get("day");
    const name = formData.get("name");

    // Navigasi ke halaman destinasi dengan query params yang sesuai
    router.push({
      pathname: "/destinations",
      query: { page: "1", limit: "10", day, name, latitude: 1, longitude: 1 },
    });
  };

  // Daftar hari dari 1 hingga 7
  const days = ["1", "2", "3", "4", "5", "6", "7"];

  return (
    <form onSubmit={handleSearch}>
      <div className="join">
        <select name="day" className="join-item select select-bordered">
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <input
          className="join-item input input-bordered w-48"
          placeholder="Search"
          name="name"
        />
        <button className="join-item btn" type="submit">
          Search
        </button>
      </div>
    </form>
  );
};
