import dayjs from "dayjs";
export function DeliveryDate({ selectedDeliveryOption }) {
  return (
    <div className="delivery-date">
      Delivery date:{" "}
      {selectedDeliveryOption
        ? dayjs(selectedDeliveryOption.estimatedDeliveryTime).format(
            "dddd, MMMM D",
          )
        : "Select a delivery option"}
    </div>
  );
}
