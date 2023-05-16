import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

export default function Res({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  return (
    <div className="mt-5  justify-center flex mb-4">
      <Link
        to={`/resource/asinglepost/${_id}`}
        class="flex flex-col bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl w-[500px] h-[150px] "
      >
        <img
          class="object-cover min-h-[150px] max-h-[150px] min-w-[200px] rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={"http://localhost:5000/" + cover}
          alt=""
        />
        <div class="flex flex-col  ml-2 p-2   ">
          <h5 class="text-2xl font-bold tracking-tight text-black  ">
            {title}
          </h5>

          <p class="mt-3  text-gray-900 text-base break-all">{summary}</p>

          <time className="mt-6 ">{formatISO9075(new Date(createdAt))}</time>
        </div>
      </Link>
    </div>
  );
}
