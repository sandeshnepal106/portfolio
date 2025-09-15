// src/components/AdminContacts.js

import React from 'react';

function AdminContacts({ contacts, currentPage, totalPages, onPageChange, loading }) {
  if (loading) {
    return <div className="text-center p-8">Loading messages...</div>;
  }

  return (
    <div className="mt-16 bg-black/40 rounded-xl p-6">
      <h2 className="text-3xl font-bold mb-6 text-center font-sigmar">Received Messages</h2>
      
      {contacts.length === 0 ? (
        <p className="text-center text-white/70">No messages found.</p>
      ) : (
        <>
          <div className='w-full overflow-x-auto [&::-webkit-scrollbar]:hidden'>
            <table className="min-w-full text-left text-white border-collapse">
              <thead className="bg-white/10">
                <tr>
                  <th className="p-3 border-b border-white/20">#</th>
                  <th className="p-3 border-b border-white/20">Name</th>
                  <th className="p-3 border-b border-white/20">Email</th>
                  <th className="p-3 border-b border-white/20">Message</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c, index) => (
                  <tr key={c._id} className="bg-white/5 hover:bg-white/10 transition-colors">
                    <td className="p-3 border-b border-white/10">{(currentPage - 1) * 5 + index + 1}</td>
                    <td className="p-3 border-b border-white/10 font-medium">{c.name}</td>
                    <td className="p-3 border-b border-white/10">{c.email}</td>
                    <td className="p-3 border-b border-white/10 text-white/80">{c.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 rounded-lg ${currentPage === i + 1 ? 'bg-white text-black font-bold' : 'bg-purple-600 text-white'}`}
                  onClick={() => onPageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AdminContacts;