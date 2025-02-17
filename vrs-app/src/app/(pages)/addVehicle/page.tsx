"use client"
import { FormEvent, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import FormGroup from "../../../components/FormGroup/FormGroup";
import "./addVehicle.css";
import ClientLayout from "@/app/client-layout";

const AddVehicle: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (status === "authenticated" && !session?.user?.isBusiness) {
      alert("Access denied. Only business accounts can add vehicles.");
      router.push("/");
    }
  }, [status, session, router]);

  const handleAddCar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      formData.append("sellerId", session?.user?.id || "");

      const response = await fetch("/api/vehicles", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert("Vehicle added successfully!");
        if (formRef.current) formRef.current.reset();
      } else {
        const error = await response.json();
        alert("Failed to add vehicle: " + error.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred.");
    }
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated" || !session?.user?.isBusiness) return null;

  return (
    <ClientLayout>
      <div className="add-vehicle-container">
        <h1>Add a New Vehicle</h1>
        <form
          className="car-form"
          onSubmit={handleAddCar}
          ref={formRef}
          encType="multipart/form-data"
        >
          <FormGroup
            label="Type:"
            id="vehicleType"
            name="vehicleType"
            type="select"
            required
            options={["Car", "Boat", "Bicycle", "Motorcycle", "Scooter"]}
          />
          <FormGroup label="Brand:" id="vehicleBrand" name="vehicleBrand" type="text"/>
          <FormGroup label="Model:" id="vehicleModel" name="vehicleModel" type="text"/>
          <FormGroup label="Year:" id="vehicleYear" name="vehicleYear" type="number"/>
          <FormGroup
            label="Fuel Type:"
            id="vehicleFuelType"
            name="vehicleFuelType"
            type="select"
            options={["Petrol", "Diesel", "Electric", "Hybrid"]}
          />
          <FormGroup
            label="Transmission:"
            id="transmission"
            name="transmission"
            type="select"
            options={["Automatic", "Manual", "Semi-Automatic"]}
          />
          <FormGroup label="Seats:" id="vehicleSeats" name="vehicleSeats" type="number"/>
          <FormGroup label="Price per Day:" id="vehiclePrice" name="vehiclePrice" type="number"/>
          <FormGroup label="Photo:" id="vehiclePhoto" name="vehiclePhoto" type="file" accept="image/*"/>
          <FormGroup
            label="Availability Status:"
            id="vehicleAvailability"
            name="vehicleAvailability"
            type="select"
            options={["Available", "Rented", "Maintenance"]}
          />
          <FormGroup label="Large Bag:" id="largeBar" name="largeBar" type="text"/>
          <FormGroup label="Vehicle Color:" id="vehicleColor" name="vehicleColor" type="text"/>
          <FormGroup label="Info:" id="info" name="info" type="text"/>
          <FormGroup label="Contact Person Phone:" id="contact" name="contact" type="text"/>
          <FormGroup label="Location:" id="vehicleLocation" name="vehicleLocation" type="text"/>

          <button type="submit" className="submit-btn">Add Vehicle</button>
        </form>
      </div>
    </ClientLayout>

  );
};

export default AddVehicle;