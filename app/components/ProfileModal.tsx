"use client";

export default function ProfileModal({ user, onClose }: any) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl w-full max-w-lg shadow-xl relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl text-slate-500 hover:text-black"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4">👤 Your Profile</h2>

        <div className="space-y-3 text-sm">

          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>

          {user.lastInput ? (
            <>
              <p><strong>Age:</strong> {user.lastInput.age}</p>
              <p><strong>Gender:</strong> {user.lastInput.gender}</p>
              <p><strong>Height:</strong> {user.lastInput.heightCm} cm</p>
              <p><strong>Weight:</strong> {user.lastInput.weightKg} kg</p>
              <p><strong>Goal:</strong> {user.lastInput.goal}</p>
              <p><strong>Level:</strong> {user.lastInput.level}</p>
              <p><strong>Location:</strong> {user.lastInput.location}</p>
              <p><strong>Diet:</strong> {user.lastInput.diet}</p>
              <p><strong>Medical History:</strong> {user.lastInput.medicalHistory || "None"}</p>
              <p><strong>Stress Level:</strong> {user.lastInput.stressLevel || "None"}</p>
            </>
          ) : (
            <p className="text-slate-400">No fitness input data found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
