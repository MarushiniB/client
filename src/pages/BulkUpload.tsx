export default function BulkUpload() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Bulk Upload</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <input type="file" className="mb-4" />

        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Upload CSV
        </button>
      </div>
    </div>
  );
}