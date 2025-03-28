"use client";

import React from "react";

// Import the newly created smart home card components
import { CardSmartHomeLight1 } from "@/registry/block/card/card-smarthome-light-1/card";
import { CardSmartHomeThermostat1 } from "@/registry/block/card/card-smarthome-thermostat-1/card";
import { CardSmartHomeSensor1 } from "@/registry/block/card/card-smarthome-sensor-1/card";
import { CardSmartHomeSecurity1 } from "@/registry/block/card/card-smarthome-security-1/card";
import { CardSmartHomeLock1 } from "@/registry/block/card/card-smarthome-lock-1/card";
import { CardSmartHomeScene1 } from "@/registry/block/card/card-smarthome-scene-1/card";
import { CardSmartHomePlug1 } from "@/registry/block/card/card-smarthome-plug-1/card";
import { CardSmartHomeMedia1 } from "@/registry/block/card/card-smarthome-media-1/card";
import { CardSmartHomeBlinds1 } from "@/registry/block/card/card-smarthome-blinds-1/card";
import { CardSmartHomeLock2 } from "@/registry/block/card/card-smarthome-lock-2/card"; // Added import
import { CardSmartHomeEnergy1 } from "@/registry/block/card/card-smarthome-energy-1/card";
import StarRating from "@/registry/block/rating-star/rating-star-1/rating-star";

const CardPage2 = () => {
  const [rating, setRating] = React.useState(5);
  return (
    <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
      <h1 className="text-3xl font-bold mb-8 col-span-full text-center">
        Smart Home Card Components{" "}
        <StarRating rating={rating} onRatingChange={setRating} />
      </h1>
      <section>
        <h2 className="text-xl font-semibold mb-4">Smart Light Control</h2>
        <CardSmartHomeLight1 />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Thermostat Control</h2>
        <CardSmartHomeThermostat1 />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Environment Sensor</h2>
        <CardSmartHomeSensor1 />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Security Camera</h2>
        <CardSmartHomeSecurity1 />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Smart Lock</h2>
        <CardSmartHomeLock1 />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Scene Activation</h2>
        <CardSmartHomeScene1 />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Smart Plug</h2>
        <CardSmartHomePlug1 />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Media Control</h2>
        <CardSmartHomeMedia1 />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Smart Blinds</h2>
        <CardSmartHomeBlinds1 />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Advanced Smart Lock</h2>
        <CardSmartHomeLock2 />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Smart Energy</h2>
        <CardSmartHomeEnergy1 />
      </section>
    </div>
  );
};

export default CardPage2;
