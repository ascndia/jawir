"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import {
  Loader2,
  PlusCircle,
  MinusCircle,
  Plane,
  Calendar,
  Users,
  MapPin,
} from "lucide-react";

import { Button } from "@/registry/components/button/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/components/form";
import { Input } from "@/registry/components/input/input-shadcn/input";
import { Textarea } from "@/registry/components/textarea";
import { Checkbox } from "@/registry/components/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/components/select";
import { RadioGroup, RadioGroupItem } from "@/registry/components/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/components/popover";
import { Calendar as CalendarComponent } from "@/registry/components/calendar";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/registry/components/card/card-shadcn/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/components/tabs";

// Define the form schema with Zod
const travelBookingSchema = z
  .object({
    tripType: z.enum(["oneWay", "roundTrip", "multiCity"], {
      required_error: "Please select a trip type",
    }),

    // For one-way and round-trip
    origin: z.string().min(2, { message: "Please enter a valid origin" }),
    destination: z
      .string()
      .min(2, { message: "Please enter a valid destination" }),
    departureDate: z.date({
      required_error: "Please select a departure date",
    }),
    returnDate: z.date().optional().nullable(),

    // For multi-city
    segments: z
      .array(
        z.object({
          from: z.string().min(2, { message: "Please enter a valid origin" }),
          to: z
            .string()
            .min(2, { message: "Please enter a valid destination" }),
          date: z.date({
            required_error: "Please select a date",
          }),
        })
      )
      .optional(),

    // Passenger information
    passengers: z.object({
      adults: z
        .number()
        .min(1, { message: "At least 1 adult is required" })
        .max(9),
      children: z.number().min(0).max(8),
      infants: z.number().min(0).max(4),
    }),

    // Preferences
    cabinClass: z.enum(
      ["economy", "premiumEconomy", "business", "firstClass"],
      {
        required_error: "Please select a cabin class",
      }
    ),

    // Contact information
    contactInfo: z.object({
      fullName: z.string().min(2, { message: "Full name is required" }),
      email: z.string().email({ message: "Please enter a valid email" }),
      phone: z.string().regex(/^\+?[0-9]{10,15}$/, {
        message: "Please enter a valid phone number",
      }),
    }),

    // Special requests
    specialRequests: z.string().max(500).optional(),

    // Terms
    agreeToTerms: z.literal(true, {
      errorMap: () => ({
        message: "You must agree to the terms and conditions",
      }),
    }),

    // Optional add-ons
    addOns: z
      .object({
        extraLuggage: z.boolean().optional(),
        priorityBoarding: z.boolean().optional(),
        mealPreference: z
          .enum(["regular", "vegetarian", "vegan", "glutenFree", "none"])
          .optional(),
        seatSelection: z.boolean().optional(),
      })
      .optional(),
  })
  .refine(
    (data) => {
      // If round trip, return date is required
      if (data.tripType === "roundTrip" && !data.returnDate) {
        return false;
      }
      // If multi-city, segments are required
      if (
        data.tripType === "multiCity" &&
        (!data.segments || data.segments.length < 2)
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Please fill in all required fields for your selected trip type",
      path: ["tripType"],
    }
  );

// Infer the type from the schema
type FormBooking1Values = z.infer<typeof travelBookingSchema>;

export default function FormBooking1() {
  const [isPending, setIsPending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingReference, setBookingReference] = useState("");

  // Initialize the form with default values
  const form = useForm<FormBooking1Values>({
    resolver: zodResolver(travelBookingSchema),
    defaultValues: {
      tripType: "roundTrip",
      origin: "",
      destination: "",
      departureDate: undefined,
      returnDate: undefined,
      segments: [
        { from: "", to: "", date: undefined },
        { from: "", to: "", date: undefined },
      ],
      passengers: {
        adults: 1,
        children: 0,
        infants: 0,
      },
      cabinClass: "economy",
      contactInfo: {
        fullName: "",
        email: "",
        phone: "",
      },
      specialRequests: "",
      agreeToTerms: true,
      addOns: {
        extraLuggage: false,
        priorityBoarding: false,
        mealPreference: "none",
        seatSelection: false,
      },
    },
  });

  // Set up field array for multi-city segments
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "segments",
  });

  // Watch for trip type changes to conditionally render form sections
  const tripType = form.watch("tripType");

  // Handle form submission
  const onSubmit = (data: FormBooking1Values) => {
    setIsPending(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form data:", data);
      setIsPending(false);
      setIsSubmitted(true);

      // Generate a fake booking reference
      const reference = `TB${Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0")}`;
      setBookingReference(reference);

      toast.success("Booking confirmed!", {
        description: `Your booking reference is ${reference}`,
        duration: 5000,
      });
    }, 2000);
  };

  // Reset the form
  const handleReset = () => {
    form.reset();
    setIsSubmitted(false);
  };

  // Add a new segment for multi-city trips
  const addSegment = () => {
    append({ from: "", to: "", date: new Date() });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <Plane className="mr-2 h-6 w-6" />
          Travel Booking
        </CardTitle>
        <CardDescription>
          Book your next adventure with our easy-to-use booking system
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-6">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <Plane className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-medium">Booking Confirmed!</h3>
                <div className="bg-muted p-4 rounded-md text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Your booking reference
                  </p>
                  <p className="text-xl font-mono font-bold">
                    {bookingReference}
                  </p>
                </div>
                <p className="text-center text-muted-foreground max-w-md">
                  Thank you for your booking. We've sent the details to your
                  email address. You can use your booking reference to check
                  your booking status.
                </p>
                <Button onClick={handleReset} variant="outline">
                  Make Another Booking
                </Button>
              </div>
            ) : (
              <Tabs defaultValue="flightDetails" className="w-full">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="flightDetails">
                    Flight Details
                  </TabsTrigger>
                  <TabsTrigger value="passengers">
                    Passengers & Preferences
                  </TabsTrigger>
                  <TabsTrigger value="contactInfo">
                    Contact & Confirmation
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="flightDetails" className="space-y-6">
                  <FormField
                    control={form.control}
                    name="tripType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Trip Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-wrap gap-4"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="oneWay" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                One Way
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="roundTrip" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Round Trip
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="multiCity" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Multi-City
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {(tripType === "oneWay" || tripType === "roundTrip") && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="origin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Origin</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    className="pl-10"
                                    placeholder="City or Airport"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="destination"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Destination</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    className="pl-10"
                                    placeholder="City or Airport"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="departureDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Departure Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className="pl-3 text-left font-normal"
                                    >
                                      <Calendar className="mr-2 h-4 w-4" />
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Select date</span>
                                      )}
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <CalendarComponent
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date <
                                      new Date(new Date().setHours(0, 0, 0, 0))
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {tripType === "roundTrip" && (
                          <FormField
                            control={form.control}
                            name="returnDate"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Return Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant="outline"
                                        className="pl-3 text-left font-normal"
                                      >
                                        <Calendar className="mr-2 h-4 w-4" />
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Select date</span>
                                        )}
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <CalendarComponent
                                      mode="single"
                                      selected={field.value || undefined}
                                      onSelect={field.onChange}
                                      disabled={(date) => {
                                        const departureDate =
                                          form.getValues("departureDate");
                                        return (
                                          date <
                                            new Date(
                                              new Date().setHours(0, 0, 0, 0)
                                            ) ||
                                          (departureDate &&
                                            date < departureDate)
                                        );
                                      }}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>
                    </>
                  )}

                  {tripType === "multiCity" && (
                    <div className="space-y-4">
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          className="p-4 border rounded-md relative"
                        >
                          <div className="absolute right-2 top-2">
                            {index > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => remove(index)}
                              >
                                <MinusCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <h3 className="font-medium mb-4">
                            Flight {index + 1}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                            <FormField
                              control={form.control}
                              name={`segments.${index}.from`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>From</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                      <Input
                                        className="pl-10"
                                        placeholder="City or Airport"
                                        {...field}
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`segments.${index}.to`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>To</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                      <Input
                                        className="pl-10"
                                        placeholder="City or Airport"
                                        {...field}
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name={`segments.${index}.date`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant="outline"
                                        className="pl-3 text-left font-normal"
                                      >
                                        <Calendar className="mr-2 h-4 w-4" />
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Select date</span>
                                        )}
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <CalendarComponent
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) => {
                                        // For first segment, can't be in the past
                                        if (index === 0) {
                                          return (
                                            date <
                                            new Date(
                                              new Date().setHours(0, 0, 0, 0)
                                            )
                                          );
                                        }

                                        // For subsequent segments, can't be before previous segment
                                        const prevDate = form.getValues(
                                          `segments.${index - 1}.date`
                                        );
                                        return (
                                          date <
                                            new Date(
                                              new Date().setHours(0, 0, 0, 0)
                                            ) ||
                                          (prevDate && date < prevDate)
                                        );
                                      }}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={addSegment}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Another Flight
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="passengers" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="passengers.adults"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adults (12+ years)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={1}
                              max={9}
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="passengers.children"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Children (2-11 years)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              max={8}
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="passengers.infants"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Infants (0-23 months)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              max={4}
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="cabinClass"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cabin Class</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select cabin class" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="economy">Economy</SelectItem>
                            <SelectItem value="premiumEconomy">
                              Premium Economy
                            </SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="firstClass">
                              First Class
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Additional Options</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="addOns.extraLuggage"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Extra Luggage</FormLabel>
                              <FormDescription>
                                Add additional checked baggage to your booking
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="addOns.priorityBoarding"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Priority Boarding</FormLabel>
                              <FormDescription>
                                Be among the first to board the aircraft
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="addOns.seatSelection"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Seat Selection</FormLabel>
                              <FormDescription>
                                Choose your preferred seats before check-in
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="addOns.mealPreference"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meal Preference</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select meal preference" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="none">
                                  No special meal
                                </SelectItem>
                                <SelectItem value="vegetarian">
                                  Vegetarian
                                </SelectItem>
                                <SelectItem value="vegan">Vegan</SelectItem>
                                <SelectItem value="glutenFree">
                                  Gluten Free
                                </SelectItem>
                                <SelectItem value="regular">Regular</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Select a special meal if required
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="contactInfo" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Contact Information</h3>

                    <FormField
                      control={form.control}
                      name="contactInfo.fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter the name of the primary traveler
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="contactInfo.email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="you@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              We'll send your booking confirmation here
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactInfo.phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+1234567890" {...field} />
                            </FormControl>
                            <FormDescription>
                              For urgent notifications about your booking
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Requests (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any special requirements or requests..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Let us know if you have any special requirements
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the terms and conditions
                          </FormLabel>
                          <FormDescription>
                            By booking this trip, you agree to our{" "}
                            <a href="#" className="text-primary underline">
                              terms and conditions
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-primary underline">
                              privacy policy
                            </a>
                            .
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>
            )}
          </CardContent>

          {!isSubmitted && (
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={isPending}
              >
                Reset
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Confirm Booking
                    <Plane className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          )}
        </form>
      </Form>
    </Card>
  );
}
