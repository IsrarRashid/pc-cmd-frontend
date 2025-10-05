const LabelFixExample = () => {
  // 1. Define a unique ID for the input field
  const inputId = "name-field-id";
  const emailId = "email-field-id";

  return (
    // Outer container styled with Tailwind to mimic a Radix Box
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        فارم مثال (سادہ HTML پر مبنی)
      </h1>

      {/* مثال 1: نام کا فیلڈ */}
      {/* The Label uses 'htmlFor' to link explicitly to the input's 'id'. 
          This is the key fix that solves the focusing issue. */}
      <label htmlFor={inputId} className="block mb-4">
        {/* Label text styled to mimic Radix Text */}
        <div className="text-sm mb-1 font-bold text-gray-700">
          نام (فوکس کرنے کے لیے یہاں کلک کریں!)
        </div>

        {/* Input field replacing Radix TextField.Root */}
        <input
          type="text"
          id={inputId} // 2. Assign the unique ID here
          defaultValue="Freja Johnsen"
          placeholder="اپنا پورا نام درج کریں"
          // Basic Tailwind styling for a clean look
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
        />
      </label>

      {/* Example 2: ای میل فیلڈ */}
      <label htmlFor={emailId} className="block mt-4">
        <div className="text-sm mb-1 font-bold text-gray-700">
          ای میل ایڈریس
        </div>
        <input
          type="email"
          id={emailId}
          defaultValue="freja@example.com"
          placeholder="اپنا ای میل درج کریں"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
        />
      </label>
    </div>
  );
};

export default LabelFixExample;
