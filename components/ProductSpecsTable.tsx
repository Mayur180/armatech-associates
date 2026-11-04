import React from 'react';

interface SpecProps {
  modelName: string;
  specs: {
    travel: string;
    accuracy: string;
    camera: string;
    magnification: string;
    software: string;
  };
}

export default function ProductSpecsTable({ modelName, specs }: SpecProps) {
  return (
    <div className="my-8 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">
          Technical Specifications: {modelName}
        </h3>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="divide-y divide-gray-200 bg-white">
          <tr>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50 w-1/3">Travel (X x Y x Z)</td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{specs.travel}</td>
          </tr>
          <tr>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">Accuracy</td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{specs.accuracy}</td>
          </tr>
          <tr>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">Camera Resolution</td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{specs.camera}</td>
          </tr>
          <tr>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">Optical Magnification</td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{specs.magnification}</td>
          </tr>
          <tr>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">Measuring Software</td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{specs.software}</td>
          </tr>
        </tbody>
      </table>
      {/* Download CTA inside the table area */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-right">
        <button className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
          Download Full Datasheet (PDF)
        </button>
      </div>
    </div>
  );
}