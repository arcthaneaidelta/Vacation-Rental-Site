import React from 'react';

export const CardSkeleton: React.FC = () => {
  return (
    <div className="card overflow-hidden">
      <div className="skel aspect-[4/3] w-full" />
      <div className="p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="skel h-3.5 w-24" />
          <div className="skel h-3.5 w-16" />
        </div>
        <div className="skel h-5 w-4/5" />
        <div className="skel h-3 w-1/2" />
        <div className="pt-2 border-t border-line-200 flex items-center justify-between">
          <div className="skel h-4 w-28" />
          <div className="skel h-4 w-12" />
        </div>
      </div>
    </div>
  );
};

export const TableRowSkeleton: React.FC = () => {
  return (
    <tr className="border-b border-line-200">
      <td className="py-4 px-4"><div className="skel h-12 w-16 rounded" /></td>
      <td className="py-4 px-4"><div className="skel h-4 w-48 mb-1.5" /><div className="skel h-3 w-28" /></td>
      <td className="py-4 px-4"><div className="skel h-4 w-24" /></td>
      <td className="py-4 px-4"><div className="skel h-6 w-20 rounded-full" /></td>
      <td className="py-4 px-4"><div className="skel h-4 w-16" /></td>
      <td className="py-4 px-4 text-right"><div className="skel h-8 w-20 rounded ml-auto" /></td>
    </tr>
  );
};

export const DetailSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="skel h-8 w-3/4" />
      <div className="skel aspect-[16/9] w-full rounded-lg" />
      <div className="space-y-2">
        <div className="skel h-4 w-full" />
        <div className="skel h-4 w-full" />
        <div className="skel h-4 w-2/3" />
      </div>
    </div>
  );
};
