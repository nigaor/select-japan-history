import {z} from 'zod';

export const historicalEventSchema = z.object({
  year: z.number().int().positive(),
  name: z.string().min(1),
  description: z.string(),
  locationId: z.number(),
  locationName: z.string(),
  image: z.string().optional(),
});

export const historicalEventsSchema = z.array(historicalEventSchema);
export type HistoricalEvent = z.infer<typeof historicalEventSchema>;