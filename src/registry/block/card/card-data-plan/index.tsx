import { Calendar, Globe, Info, Phone, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function CardDataPlan1A() {
  return (
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <div className="flex items-center gap-2">
            <Globe className="h-8 w-8 text-blue-600 fill-blue-100" />
            <h2 className="text-xl font-semibold">3XL Combo Flex Plan</h2>
          </div>
          <Trash2 className="h-5 w-5 text-pink-500" />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="border-t border-gray-200 pt-4 space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  <span className="font-medium">Main Quota</span>
                </div>
                <span className="font-medium text-gray-700">3.5 GB</span>
              </div>
              <Progress value={100} className="h-2 bg-gray-100" />
              <div className="flex justify-end">
                <span className="text-sm text-gray-500">3.5 GB</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  <span className="font-medium">WhatsApp, LINE</span>
                </div>
                <span className="font-medium text-gray-700">1.23 GB</span>
              </div>
              <Progress value={(100 * 1.23) / 2} className="h-2 bg-gray-100" />
              <div className="flex justify-end">
                <span className="text-sm text-gray-500">2 GB</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 rotate-90" />
                  <span className="font-medium">Call to All Operators</span>
                </div>
                <span className="font-medium text-gray-700">5 Minutes</span>
              </div>
              <Progress value={100} className="h-2 bg-gray-100" />
              <div className="flex justify-end">
                <span className="text-sm text-gray-500">5 Minutes</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  <span className="font-medium">Local Quota</span>
                </div>
                <span className="font-medium text-pink-500">0 KB</span>
              </div>
              <Progress value={0} className="h-2 bg-gray-100" />
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">San Francisco</span>
                <span className="text-sm text-gray-400">0 KB</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span className="font-medium">Quota Reset</span>
                </div>
                <div className="text-right">
                  <span className="font-medium text-gray-700">24 Nov 2024</span>
                </div>
              </div>
              <div className="flex justify-end">
                <span className="text-sm text-gray-500">23:59 UTC</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Info className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">Extra WhatsApp & LINE</span>
            </div>
          </div>
        </CardContent>
      </Card>
    
  )
}

