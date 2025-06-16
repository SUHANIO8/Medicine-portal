import { useState, useEffect } from 'react';
import { QrCodeIcon, DocumentTextIcon, ShieldCheckIcon, ClockIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [qrValue, setQrValue] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [userMedicines, setUserMedicines] = useState(() => {
    const storedMedicines = localStorage.getItem('userMedicines');
    return storedMedicines ? JSON.parse(storedMedicines) : [
      {
        id: 1,
        name: "Paracetamol 500mg",
        dosage: "1 tablet every 6 hours",
        expiry: "2025-06-30",
        lastTaken: "2023-10-15"
      },
      {
        id: 2,
        name: "Vitamin C",
        dosage: "1 capsule daily",
        expiry: "2024-12-31",
        lastTaken: "2023-10-15"
      }
    ];
  });

  const [stats, setStats] = useState([
    { name: 'Active Medicines', value: userMedicines.length.toString(), icon: ShieldCheckIcon },
    { name: 'Prescriptions', value: '2', icon: DocumentTextIcon },
    { name: 'Recent Scans', value: '3', icon: ClockIcon }
  ]);

  useEffect(() => {
    localStorage.setItem('userMedicines', JSON.stringify(userMedicines));
    setStats([
      { name: 'Active Medicines', value: userMedicines.length.toString(), icon: ShieldCheckIcon },
      { name: 'Prescriptions', value: '2', icon: DocumentTextIcon },
      { name: 'Recent Scans', value: '3', icon: ClockIcon }
    ]);
  }, [userMedicines]);

  const handleScan = () => {
    const mockMedicine = {
      name: "Ibuprofen 200mg",
      batch: "IBX202378",
      expiry: "2024-09-15",
      manufacturer: "MediCorp"
    };
    setScanResult(mockMedicine);
    setQrValue(`medicine:${mockMedicine.batch}`);

    // Add to user's medicines if not already present
    if (!userMedicines.some(m => m.name === mockMedicine.name)) {
      setUserMedicines([...userMedicines, {
        id: userMedicines.length + 1,
        name: mockMedicine.name,
        dosage: "As directed by physician",
        expiry: mockMedicine.expiry,
        lastTaken: new Date().toISOString().split('T')[0]
      }]);
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, this would process the QR image
      alert(`QR code from ${file.name} would be processed here`);
      handleScan(); // Simulate scan for demo
    }
  };

  console.log('QR value:', qrValue);
  console.log('Scan result:', scanResult);
  console.log('User medicines:', userMedicines);
  console.log('Stats:', stats);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Your Medicine Dashboard</h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-blue-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="truncate text-sm font-medium text-gray-500">{stat.name}</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">{stat.value}</dd>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">QR Operations</h3>
            <div className="mt-4 space-y-4">
              <div className="flex justify-center p-4 bg-gray-100 rounded-lg">
                <QrCodeIcon className="h-32 w-32 text-gray-400" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleScan}
                  className="inline-flex justify-center items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Scan QR Code
                </button>
                <label className="inline-flex justify-center items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer">
                  <ArrowUpTrayIcon className="h-4 w-4 mr-2" />
                  Upload QR
                  <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Scan Results</h3>
            <div className="mt-4 space-y-4">
              {scanResult ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-900">Medicine: <span className="font-normal">{scanResult.name}</span></p>
                  <p className="text-sm font-medium text-gray-900">Batch: <span className="font-normal">{scanResult.batch}</span></p>
                  <p className="text-sm font-medium text-gray-900">Expiry: <span className="font-normal">{scanResult.expiry}</span></p>
                  <div className="p-2 mt-4 bg-green-50 text-green-700 text-sm rounded">
                    Verified and added to your medicines
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Scan or upload a medicine QR code to view details
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Your Medicines</h3>
          <div className="mt-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Taken</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userMedicines.map((medicine) => (
                    <tr key={medicine.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{medicine.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medicine.dosage}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medicine.expiry}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medicine.lastTaken}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
