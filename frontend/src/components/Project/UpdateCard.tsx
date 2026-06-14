export interface Update {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  percentage: number;
  link?: string;
}

interface UpdateCardProps {
  update: Update;
}

export default function UpdateCard({ update }: UpdateCardProps) {
  return (
    <div className="bg-[#ebebeb] border border-neutral-300 rounded-md p-4 sm:p-5 flex flex-col gap-2 shadow-sm font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h3 className="text-gray-950 font-bold text-base sm:text-lg">
          {update.title}
        </h3>
        <span className="text-xs sm:text-sm text-neutral-500 font-medium">
          {update.timestamp}
        </span>
      </div>

      <p className="text-gray-800 text-sm md:text-base leading-relaxed">
        {update.content}
      </p>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-2 pt-2 border-t border-neutral-200/50">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-950 bg-neutral-300 px-2 py-0.5 rounded-sm">
            {update.percentage}%
          </span>
          <div className="w-24 h-2 bg-neutral-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${update.percentage}%` }}
            />
          </div>
        </div>

        {update.link && (
          <a
            href={update.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline break-all"
          >
            {update.link}
          </a>
        )}
      </div>
    </div>
  );
}