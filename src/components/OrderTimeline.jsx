import { ORDER_STATUS } from "../constants/order";

const STEPS = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.CONFIRMED,
  ORDER_STATUS.PACKED,
  ORDER_STATUS.OUT_FOR_DELIVERY,
  ORDER_STATUS.DELIVERED,
];

function OrderTimeline({ status }) {
  const activeIndex = STEPS.indexOf(status);

  return (
    <div className="rounded-3xl bg-white p-6 shadow">

      <h2 className="mb-8 text-2xl font-bold">
        Order Progress
      </h2>

      <div className="space-y-8">

        {STEPS.map((step, index) => {

          const completed =
            index <= activeIndex;

          const last =
            index === STEPS.length - 1;

          return (

            <div
              key={step}
              className="flex items-start gap-4"
            >

              <div className="flex flex-col items-center">

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-white ${
                    completed
                      ? "bg-green-600"
                      : "bg-gray-300"
                  }`}
                >
                  {completed ? "✓" : index + 1}
                </div>

                {!last && (
                  <div
                    className={`mt-2 h-12 w-1 rounded ${
                      completed
                        ? "bg-green-600"
                        : "bg-gray-300"
                    }`}
                  />
                )}

              </div>

              <div>

                <h3
                  className={`font-semibold ${
                    completed
                      ? "text-green-700"
                      : "text-gray-500"
                  }`}
                >
                  {step}
                </h3>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}

export default OrderTimeline;